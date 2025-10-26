import { OAuthProvider } from '../../shared/entities/oauth-provider.enum';

import { BadRequestException, Body, Controller, Get, HttpCode, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OidcService } from './oidc.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { DataSource } from 'typeorm';
import { Docente, OAuthAccount } from '../../shared/entities';

@ApiTags('auth')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly oidc: OidcService, private readonly jwt: JwtService, private readonly dataSource: DataSource) {
    this.docenteRepo = this.dataSource.getRepository(Docente);
    this.oauthRepo = this.dataSource.getRepository(OAuthAccount);
  }
  private docenteRepo: any;
  private oauthRepo: any;

  @Get('login') 
  async login(@Res() res: Response) { await this.oidc.getClient(); return res.redirect(this.oidc.createAuthUrl()); }

  @Get('callback') 
  async callback(@Req() req: Request, @Res() res: Response, @Query() query: any) {
    await this.oidc.getClient();
    const { userinfo } = await this.oidc.callback(query);
    const email = (userinfo as any).email as string | undefined;
    const name = (userinfo as any).name as string | undefined;
    const picture = (userinfo as any).picture as string | undefined;
    if (!email) throw new UnauthorizedException('No email in userinfo');
    const allowed = process.env.OAUTH_ALLOWED_DOMAIN || 'unifranz.edu.bo';
    if (email.split('@')[1] !== allowed) throw new UnauthorizedException('Dominio no permitido');
    let docente = await this.docenteRepo.findOne({ where: { email } });
    if (!docente) docente = await this.docenteRepo.save(this.docenteRepo.create({ email, nombre: name || email.split('@')[0], avatarUrl: picture }));
    docente.lastLoginAt = new Date(); await this.docenteRepo.save(docente);
    const provider = (process.env.OAUTH_PROVIDER || 'google') === 'google' ? OAuthProvider.GOOGLE : OAuthProvider.MICROSOFT;
    let oa = await this.oauthRepo.findOne({ where: { email, docente: { id: docente.id } }, relations: ['docente'] });
    if (!oa) oa = await this.oauthRepo.save(this.oauthRepo.create({ email, provider, providerId: email, docente }));
    const accessToken = await this.jwt.signAsync({ sub: docente.id, email: docente.email, nombre: docente.nombre }, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
    const refreshToken = await this.jwt.signAsync({ sub: docente.id, typ: 'refresh' }, { expiresIn: process.env.REFRESH_EXPIRES_IN || '7d' });
    oa.hashedRefreshToken = await bcrypt.hash(refreshToken, 10); await this.oauthRepo.save(oa);
    if ((req.query as any).redirect_uri) { const url = new URL(String((req.query as any).redirect_uri)); url.hash = `#accessToken=${accessToken}&refreshToken=${refreshToken}`; return res.redirect(url.toString()); }
    return res.json({ accessToken, refreshToken });
  }

  @Post('refresh') @HttpCode(200) 
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) throw new BadRequestException('Missing refreshToken');
    const payload = await this.jwt.verifyAsync(refreshToken, { secret: process.env.JWT_SECRET || 'change-me' }).catch(() => { throw new UnauthorizedException('Invalid refresh token'); });
    const docenteId = payload.sub as string;
    const oa = await this.oauthRepo.findOne({ where: { docente: { id: docenteId } }, relations: ['docente'] });
    if (!oa?.hashedRefreshToken) throw new UnauthorizedException('No active session');
    const ok = await require('bcrypt').compare(refreshToken, oa.hashedRefreshToken); if (!ok) throw new UnauthorizedException('Invalid refresh token');
    const accessToken = await this.jwt.signAsync({ sub: docenteId, email: oa.docente.email, nombre: oa.docente.nombre }, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
    return { accessToken };
  }

  @Post('logout') @HttpCode(200) @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any) {
    const docenteId = req.user.sub as string;
    const oa = await this.oauthRepo.findOne({ where: { docente: { id: docenteId } }, relations: ['docente'] });
    if (oa) { oa.hashedRefreshToken = null; await this.oauthRepo.save(oa); }
    return { ok: true };
  }

  @Get('me') @ApiBearerAuth() @UseGuards(JwtAuthGuard, DomainGuard)
  async me(@Req() req: any) { return { id: req.user.sub, email: req.user.email, nombre: req.user.nombre }; }
}
