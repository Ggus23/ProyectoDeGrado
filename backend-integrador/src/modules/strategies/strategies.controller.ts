
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Strategy, StrategyType } from '../../shared/entities/strategy.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { CreateStrategyDto } from './dto/create-strategy.dto';
@ApiTags('strategies') @ApiBearerAuth() @Controller('strategies') @UseGuards(JwtAuthGuard, DomainGuard)
export class StrategiesController {
  constructor(private readonly dataSource: DataSource) {}
  @Get() @ApiQuery({ name: 'tipo', required: false, enum: StrategyType }) async list(@Query('tipo') tipo?: StrategyType) {
    const repo = this.dataSource.getRepository(Strategy); return await repo.find({ where: tipo ? { tipo } : {} });
  }
  @Post() async create(@Body() dto: CreateStrategyDto) {
    const repo = this.dataSource.getRepository(Strategy); return await repo.save(repo.create(dto));
  }
}
