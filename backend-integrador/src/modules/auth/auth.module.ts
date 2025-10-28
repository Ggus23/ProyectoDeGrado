// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler'; // opcional, si no lo tienes global
import { AuthController } from './auth.controller';
import { OidcService } from './oidc.service';
import { EmailPolicyService } from './email-policy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
     ConfigModule,
    // 👇 PassportModule DEBE estar en imports del módulo si lo vas a exportar
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    // 👇 El JwtModule async solo importa lo que él necesita (ConfigModule);
    // NO metas aquí PassportModule.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET') ?? 'change-me',
        signOptions: { expiresIn: cfg.get<string>('JWT_EXPIRES_IN') ?? '15m' },
       }),
     }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy ,OidcService, EmailPolicyService],
  exports: [EmailPolicyService, PassportModule],
})
export class AuthModule {}
