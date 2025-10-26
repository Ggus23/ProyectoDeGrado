
import { Body, Controller, Get, Post, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Alignment, PgfUnit, Rubric } from '../../shared/entities';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { AlignmentDto } from './dto/alignment.dto';
@ApiTags('alignment') @ApiBearerAuth() @Controller('alignment') @UseGuards(JwtAuthGuard, DomainGuard)
export class AlignmentController {
  constructor(private readonly dataSource: DataSource) {}
  @Post() async create(@Body() dto: AlignmentDto) {
    const unit = await this.dataSource.getRepository(PgfUnit).findOne({ where: { id: dto.pgfUnitId } });
    if (!unit) throw new BadRequestException('Unidad no encontrada'); let rubric: Rubric | null = null;
    if (dto.rubricId) rubric = await this.dataSource.getRepository(Rubric).findOneBy({ id: dto.rubricId });
    const repo = this.dataSource.getRepository(Alignment); const saved = await repo.save(repo.create({ pgfUnit: unit, competencia: dto.competencia, resultadoAprendizaje: dto.resultadoAprendizaje, evidencia: dto.evidencia, rubric }));
    if (!saved.rubric) throw new BadRequestException('Cada evidencia debe enlazar al menos 1 rúbrica/criterio'); return saved;
  }
  @Get() @ApiQuery({ name: 'pgfUnitId', required: true }) async list(@Query('pgfUnitId') pgfUnitId: string) {
    return await this.dataSource.getRepository(Alignment).find({ where: { pgfUnit: { id: pgfUnitId } }, relations: ['rubric'] });
  }
}
