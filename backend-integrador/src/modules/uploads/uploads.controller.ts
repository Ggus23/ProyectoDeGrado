import { Request } from 'express';
import { Express } from 'express';
import { RequestWithUser } from '../../shared/request-with-user';
import { Body } from '@nestjs/common';

import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Upload, Docente } from '../../shared/entities';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { v4  } from 'uuid';
@ApiTags('uploads') @ApiBearerAuth() @Controller('uploads') @UseGuards(JwtAuthGuard, DomainGuard)

export class UploadsController {
  constructor(private readonly dataSource: DataSource) {}
  @Post() @ApiConsumes('multipart/form-data') @UseInterceptors(FileInterceptor('file', { storage: diskStorage({
    destination: (_req, _file, cb) => cb(null, process.env.UPLOADS_DIR || './uploads'),
    filename: (_req, file, cb) => cb(null, `${uuid()}-${file.originalname}`)
  }) }))
  @UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: (_req, _file, cb) =>
      cb(null, process.env.UPLOADS_DIR || './uploads'),
    filename: (_req, file, cb) =>
      cb(null, `${uuid()}-${file.originalname}`),
  }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: any, @Req() req: RequestWithUser) {
    const repo = this.dataSource.getRepository(Upload);
    const owner = await this.dataSource.getRepository(Docente).findOneByOrFail({ id: req.user.sub });
    return await repo.save(repo.create({ owner, filename: file.originalname, mimeType: file.mimetype, size: file.size, path: file.path }));
  }
}
