// src/auth/domain.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

function parseEnvList(name: string): string[] {
  const raw = process.env[name] ?? '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

@Injectable()
export class DomainGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as { email?: string };

    if (!user?.email) {
      throw new UnauthorizedException('No user');
    }

    const email = user.email.toLowerCase();

    // 1) Allowlist temporal (pasa directo)
    const allowlist = parseEnvList('ALLOWLIST_EMAILS').map((e) => e.toLowerCase());
    if (allowlist.includes(email)) {
      return true;
    }

    // 2) Dominios permitidos (soporta coma-separados)
    const allowedDomains =
      parseEnvList('ALLOWED_DOMAIN').length > 0
        ? parseEnvList('ALLOWED_DOMAIN')
        : process.env.OAUTH_ALLOWED_DOMAIN
          ? parseEnvList('OAUTH_ALLOWED_DOMAIN')
          : ['unifranz.edu.bo'];

    const [, domain] = email.split('@');
    if (!domain || !allowedDomains.map((d) => d.toLowerCase()).includes(domain)) {
      throw new ForbiddenException('Dominio no permitido');
    }

    // 3) Política “solo docentes” (si DOC_ONLY=true)
    const docOnly = (process.env.DOC_ONLY ?? 'false').toLowerCase() === 'true';
    if (docOnly) {
      const local = email.split('@')[0] ?? '';
      const docPrefix = (process.env.DOC_PREFIX ?? 'doc.').toLowerCase();
      if (!local.startsWith(docPrefix)) {
        throw new ForbiddenException('Solo docentes pueden acceder');
      }
    }
    console.log('[DomainGuard] Usuario autenticado:', user?.email);
    console.log('[DomainGuard] ALLOWLIST_EMAILS:', process.env.ALLOWLIST_EMAILS);
    console.log('[DomainGuard] ALLOWED_DOMAIN:', process.env.ALLOWED_DOMAIN);
    console.log('[DomainGuard] DOC_ONLY:', process.env.DOC_ONLY);
    return true;
  }
}
