
import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Docente } from './shared/entities/docente.entity';
import { OAuthAccount } from './shared/entities/oauth-account.entity';
import { PgfDocument } from './shared/entities/pgf-document.entity';
import { PgfUnit } from './shared/entities/pgf-unit.entity';
import { Strategy } from './shared/entities/strategy.entity';
import { Rubric } from './shared/entities/rubric.entity';
import { Alignment } from './shared/entities/alignment.entity';
import { SequenceItem } from './shared/entities/sequence-item.entity';
import { ChecklistItem } from './shared/entities/checklist-item.entity';
import { Upload } from './shared/entities/upload.entity';
const isSSL = process.env.DB_SSL === 'true';
const entities = [Docente, OAuthAccount, PgfDocument, PgfUnit, Strategy, Rubric, Alignment, SequenceItem, ChecklistItem, Upload];

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: isSSL ? { rejectUnauthorized: false } : false,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});

export default dataSource; 