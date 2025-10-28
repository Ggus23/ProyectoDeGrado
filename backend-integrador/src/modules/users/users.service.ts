import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities';

function parseEnvList(name: string): string[] {
  const raw = process.env[name] ?? '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  private inferRole(email?: string): 'docente' | 'estudiante' {
    const domain = process.env.ALLOWED_DOMAIN ?? 'unifranz.edu.bo';
    const docPrefix = process.env.DOC_PREFIX ?? 'doc.';
    if (!email) return 'estudiante';
    const [local, dom] = email.split('@');
    if (dom === domain && local?.startsWith(docPrefix)) return 'docente';
    return 'estudiante';
  }

  /**
   * Crea/lee usuario y aplica la política:
   * - Si DOC_ONLY=true => solo 'docente' accede, excepto allowlist temporal.
   * - Si DOC_ONLY=false => entra cualquiera autenticado; rol se infiere.
   */
  async findOrProvisionWithPolicy(auth0Sub: string, email: string) {
    const allowlist = parseEnvList('ALLOWLIST_EMAILS');
    const docOnly = (process.env.DOC_ONLY ?? 'false').toLowerCase() === 'true';

    let user = await this.repo.findOne({ where: [{ auth0Sub }, { email }] });

    const role = this.inferRole(email);

    if (!user) {
      user = this.repo.create({ auth0Sub, email, role });
      await this.repo.save(user);
    } else if (user.role !== role) {
      // Mantén roles consistentes si cambia el correo
      user.role = role;
      await this.repo.save(user);
    }

    if (docOnly) {
      const isDocente = user.role === 'docente';
      const isAllowlisted = allowlist.includes(email);
      if (!isDocente && !isAllowlisted) {
        // 🔒 Política “solo docentes” activa
        throw new ForbiddenException('Acceso restringido a cuentas docentes.');
      }
    }
    console.log('[UsersService] Email:', email);
    console.log('[UsersService] DOC_ONLY:', process.env.DOC_ONLY);
    return user;
  }
}
