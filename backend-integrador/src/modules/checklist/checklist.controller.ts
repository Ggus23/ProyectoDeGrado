import { Body, Controller, Patch, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { ChecklistItem } from '../../shared/entities/checklist-item.entity';
import { PgfUnit } from '../../shared/entities/pgf-unit.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { ChecklistDto } from './dto/checklist.dto';
@ApiTags('checklist')
@ApiBearerAuth()
@Controller('checklist')
@UseGuards(JwtAuthGuard, DomainGuard)
export class ChecklistController {
  constructor(private readonly dataSource: DataSource) {}
  @Post() async create(@Body() dto: ChecklistDto) {
    const unit = await this.dataSource
      .getRepository(PgfUnit)
      .findOneByOrFail({ id: dto.pgfUnitId });
    return await this.dataSource.getRepository(ChecklistItem).save({ ...dto, pgfUnit: unit });
  }
  @Patch(':id') async patch(@Param('id') id: string, @Body() dto: ChecklistDto) {
    const repo = this.dataSource.getRepository(ChecklistItem);
    await repo.update({ id }, { ...dto });
    return await repo.findOneByOrFail({ id });
  }
}
