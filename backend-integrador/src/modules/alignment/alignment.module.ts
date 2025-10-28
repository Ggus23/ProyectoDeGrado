import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alignment, PgfUnit, Rubric } from '../../shared/entities';
import { AlignmentController } from './alignment.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Alignment, PgfUnit, Rubric])],
  controllers: [AlignmentController],
})
export class AlignmentModule {}
