
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable() export class DomainGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as { email?: string };
    if (!user?.email) throw new UnauthorizedException('No user');
    const allowed = process.env.OAUTH_ALLOWED_DOMAIN || 'unifranz.edu.bo';
    const domain = user.email.split('@')[1];
    if (domain !== allowed) throw new UnauthorizedException('Dominio no permitido');
    return true;
  }
}
