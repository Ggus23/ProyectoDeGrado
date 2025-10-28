import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgfController } from './pgf.controller';
import { PgfDocument, PgfUnit, Docente } from '../../shared/entities';
@Module({
  imports: [TypeOrmModule.forFeature([PgfDocument, PgfUnit, Docente])],
  controllers: [PgfController],
})
export class PgfModule {}
