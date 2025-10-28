import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { SequenceItem } from '../../shared/entities/sequence-item.entity';
import { PgfUnit } from '../../shared/entities/pgf-unit.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { SequenceItemDto } from './dto/sequence.dto';
@ApiTags('sequencer')
@ApiBearerAuth()
@Controller('sequencer')
@UseGuards(JwtAuthGuard, DomainGuard)
export class SequencerController {
  constructor(private readonly dataSource: DataSource) {}
  @Post() async create(@Body() dto: SequenceItemDto) {
    const unit = await this.dataSource
      .getRepository(PgfUnit)
      .findOneByOrFail({ id: dto.pgfUnitId });
    return await this.dataSource.getRepository(SequenceItem).save({ ...dto, pgfUnit: unit });
  }
  @Get() @ApiQuery({ name: 'pgfUnitId', required: true }) async list(
    @Query('pgfUnitId') pgfUnitId: string,
  ) {
    return await this.dataSource
      .getRepository(SequenceItem)
      .find({ where: { pgfUnit: { id: pgfUnitId } } });
  }
}
