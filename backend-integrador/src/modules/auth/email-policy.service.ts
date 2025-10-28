import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type Audience = 'student' | 'docente' | 'both' | 'regex';

@Injectable()
export class EmailPolicyService {
  private readonly domain: string;
  private readonly audience: Audience;
  private readonly studentPrefix: string;
  private readonly docentePrefix: string;
  private readonly singleRegex?: RegExp;

  constructor(private readonly config: ConfigService) {
    this.domain = (
      this.config.get<string>('OAUTH_ALLOWED_DOMAIN') || 'unifranz.edu.bo'
    ).toLowerCase();
    this.audience = (this.config.get<string>('OAUTH_ALLOWED_AUDIENCE') as Audience) || 'student';
    this.studentPrefix = (this.config.get<string>('OAUTH_PREFIX_STUDENT') || 'cbbe.').toLowerCase();
    this.docentePrefix = (this.config.get<string>('OAUTH_PREFIX_DOCENTE') || 'doc.').toLowerCase();

    const regex = this.config.get<string>('OAUTH_ALLOWED_EMAIL_REGEX');
    if (regex) this.singleRegex = new RegExp(regex, 'i');
  }

  isEmailAllowed(emailRaw?: string | null): boolean {
    if (!emailRaw) return false;
    const email = emailRaw.trim().toLowerCase();

    // 🔁 En modo regex, NO exigimos dominio fijo
    if (this.audience === 'regex') {
      return this.singleRegex ? this.singleRegex.test(email) : false;
    }

    // 1) dominio obligatorio (solo para student/docente/both)
    if (!email.endsWith(`@${this.domain}`)) return false;

    // 2) por audiencia
    switch (this.audience) {
      case 'student':
        return email.startsWith(this.studentPrefix);
      case 'docente':
        return email.startsWith(this.docentePrefix);
      case 'both':
        return email.startsWith(this.studentPrefix) || email.startsWith(this.docentePrefix);
      default:
        return false;
    }
  }
}
