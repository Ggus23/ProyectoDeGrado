import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Docente } from '../../shared/entities';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';

@ApiTags('docentes')
@ApiBearerAuth()
@Controller('docentes')
@UseGuards(JwtAuthGuard, DomainGuard)
export class DocentesController {
  constructor(private readonly dataSource: DataSource) {}
  @Get('me') async me(@Req() req: any) {
    return await this.dataSource.getRepository(Docente).findOne({ where: { id: req.user.sub } });
  }
  @Patch('me') async update(@Req() req: any, @Body() dto: any) {
    const repo = this.dataSource.getRepository(Docente);
    await repo.update({ id: req.user.sub }, dto);
    return await repo.findOne({ where: { id: req.user.sub } });
  }
}
