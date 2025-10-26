
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { entities } from './shared/entities';

@Injectable()
export class OrmConfig {
  constructor(private readonly config: ConfigService) {}
  createTypeOrmOptions(): DataSourceOptions {
    return {
      type: 'postgres',
      url: this.config.get<string>('DATABASE_URL'),
      entities,
      synchronize: false,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      logging: false,
    };
  }
}
