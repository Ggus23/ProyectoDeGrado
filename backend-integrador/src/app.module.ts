
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { OrmConfig } from './ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { DocentesModule } from './modules/docentes/docentes.module';
import { PgfModule } from './modules/pgf/pgf.module';
import { StrategiesModule } from './modules/strategies/strategies.module';
import { RubricsModule } from './modules/rubrics/rubrics.module';
import { AlignmentModule } from './modules/alignment/alignment.module';
import { SequencerModule } from './modules/sequencer/sequencer.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local', '.env.development'] }),
    TypeOrmModule.forRootAsync({ useClass: OrmConfig }),
    ThrottlerModule.forRoot([
      { name: 'general', ttl: parseInt(process.env.RATE_LIMIT_GENERAL_TTL || '60'), limit: parseInt(process.env.RATE_LIMIT_GENERAL_LIMIT || '100') },
      { name: 'auth', ttl: parseInt(process.env.RATE_LIMIT_AUTH_TTL || '60'), limit: parseInt(process.env.RATE_LIMIT_AUTH_LIMIT || '10') }
    ]),
    AuthModule,
    DocentesModule,
    PgfModule,
    StrategiesModule,
    RubricsModule,
    AlignmentModule,
    SequencerModule,
    ChecklistModule,
    UploadsModule,
    AiModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
