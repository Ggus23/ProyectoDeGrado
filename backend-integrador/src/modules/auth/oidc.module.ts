// src/auth/oidc.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OidcService } from './oidc.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [OidcService],
  exports: [OidcService],
})
export class OidcModule {}
