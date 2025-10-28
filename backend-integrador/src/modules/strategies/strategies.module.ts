import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from '../../shared/entities/strategy.entity';
import { StrategiesController } from './strategies.controller';
@Module({ imports: [TypeOrmModule.forFeature([Strategy])], controllers: [StrategiesController] })
export class StrategiesModule {}
