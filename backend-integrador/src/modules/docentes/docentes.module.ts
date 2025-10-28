import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocentesController } from './docentes.controller';
import { Docente } from '../../shared/entities';
@Module({ imports: [TypeOrmModule.forFeature([Docente])], controllers: [DocentesController] })
export class DocentesModule {}
