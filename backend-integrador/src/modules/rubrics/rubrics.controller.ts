
import { Body, Controller, Get, Param, Patch, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Rubric, PgfUnit } from '../../shared/entities';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { UpsertRubricDto } from './dto/upsert-rubric.dto';
@ApiTags('rubrics') @ApiBearerAuth() @Controller('rubrics') @UseGuards(JwtAuthGuard, DomainGuard)
export class RubricsController {
  constructor(private readonly dataSource: DataSource) {}
  @Post() async create(@Body() dto: UpsertRubricDto) {
    if (!dto.criterios || !dto.niveles) throw new BadRequestException('Faltan criterios o niveles');
    const repo = this.dataSource.getRepository(Rubric); let pgfUnit: PgfUnit | null = null;
    if (dto.pgfUnitId) pgfUnit = await this.dataSource.getRepository(PgfUnit).findOneBy({ id: dto.pgfUnitId });
    const saved = await repo.save(repo.create({ nombre: dto.nombre, tipo: dto.tipo, criterios: dto.criterios, niveles: dto.niveles, version: dto.version || 1, isPublished: !!dto.isPublished, pgfUnit }));
    if (saved.isPublished && (!saved.criterios || !saved.niveles)) throw new BadRequestException('No se publica una rúbrica si faltan criterios o niveles'); return saved;
  }
  @Get(':id') async get(@Param('id') id: string) { return await this.dataSource.getRepository(Rubric).findOne({ where: { id }, relations: ['pgfUnit'] }); }
  @Patch(':id') async patch(@Param('id') id: string, @Body() dto: UpsertRubricDto) { const repo = this.dataSource.getRepository(Rubric); await repo.update({ id }, { ...dto }); return await repo.findOneBy({ id }); }
}
