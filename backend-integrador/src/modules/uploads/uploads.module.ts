import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsController } from './uploads.controller';
import { Upload, Docente } from '../../shared/entities';
@Module({
  imports: [TypeOrmModule.forFeature([Upload, Docente])],
  controllers: [UploadsController],
})
export class UploadsModule {}
