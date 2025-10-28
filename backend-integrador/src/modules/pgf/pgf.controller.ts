import { PgfStatus } from '../../shared/entities/pgf.enums';
import { Request } from 'express';
import { Express } from 'express';
import { RequestWithUser } from '../../shared/request-with-user';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { DataSource, ILike } from 'typeorm';
import { PgfDocument, PgfUnit, Docente } from '../../shared/entities';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
import { CreatePgfDto } from './dto/create-pgf.dto';
import { parseXlsxOrCsv, parsePdfStub } from './pgf.parsers';
import { v4 } from 'uuid';

@ApiTags('pgf')
@ApiBearerAuth()
@Controller('pgf')
@UseGuards(JwtAuthGuard, DomainGuard)
export class PgfController {
  constructor(private readonly dataSource: DataSource) {}
  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  async list(
    @Req() req: RequestWithUser,
    @Query('query') query?: string,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
  ) {
    const repo = this.dataSource.getRepository(PgfDocument);
    const take = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (Math.max(1, parseInt(page)) - 1) * take;
    const [items, total] = await repo.findAndCount({
      where: {
        uploadedBy: { id: req.user.sub },
        ...(query ? { titulo: ILike(`%${query}%`) } : {}),
      },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return { items, total, page: parseInt(page), pageSize: take };
  }
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => cb(null, process.env.UPLOADS_DIR || './uploads'),
        filename: (_req, file, cb) => cb(null, `${uuid()}-${file.originalname}`),
      }),
    }),
  )
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => cb(null, process.env.UPLOADS_DIR || './uploads'),
        filename: (_req, file, cb) => cb(null, `${uuid()}-${file.originalname}`),
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePgfDto,
    @Req() req: RequestWithUser,
  ) {
    if (!file) throw new BadRequestException('Falta archivo');
    const docente = await this.dataSource
      .getRepository(Docente)
      .findOneByOrFail({ id: req.user.sub });
    const repo = this.dataSource.getRepository(PgfDocument);
    return await repo.save(repo.create({ ...dto, uploadedBy: docente }));
  }
  @Post(':id/parse') async parse(@Param('id') id: string) {
    const repo = this.dataSource.getRepository(PgfDocument);
    const unitsRepo = this.dataSource.getRepository(PgfUnit);
    const pgf = await repo.findOne({ where: { id }, relations: ['uploadedBy'] });
    if (!pgf) throw new BadRequestException('PGF no encontrado');
    const path = pgf.sourceFile.toLowerCase();
    if (path.endsWith('.pdf')) {
      parsePdfStub();
    }
    const parsed = await parseXlsxOrCsv(pgf.sourceFile);
    await unitsRepo.delete({ pgf: { id: pgf.id } as any });
    for (const u of parsed.units) {
      await unitsRepo.save(
        unitsRepo.create({
          pgf,
          titulo: u.titulo,
          semana: u.semana,
          resultadosAprendizaje: u.resultadosAprendizaje,
          contenidos: u.contenidos,
          estrategias: u.estrategias,
        }),
      );
    }
    await repo.update({ id }, { status: PgfStatus.PARSED } as any);
    return { ok: true, units: parsed.units.length };
  }
  @Get(':id') async getOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const repo = this.dataSource.getRepository(PgfDocument);
    return await repo.findOne({
      where: { id, uploadedBy: { id: req.user.sub } },
      relations: ['uploadedBy'],
    });
  }
  @Get(':id/units') async units(@Param('id') id: string, @Req() req: RequestWithUser) {
    const repo = this.dataSource.getRepository(PgfUnit);
    return await repo.find({
      where: { pgf: { id, uploadedBy: { id: req.user.sub } } as any },
      order: { semana: 'ASC' },
    });
  }
}
