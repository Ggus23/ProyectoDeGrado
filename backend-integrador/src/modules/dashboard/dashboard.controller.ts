import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DataSource } from 'typeorm';
import { UsersService } from '../users/users.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly ds: DataSource, private readonly users: UsersService) {}

  @Get('summary')
  async summary(@Req() req: any) {
    const { sub, email } = req.user;
    const user = await this.users.findOrProvisionWithPolicy(sub, email);

    if (user.role === 'docente') {
      const [cursos, pendientes] = await Promise.all([
        this.ds.query(`SELECT COUNT(*)::int AS count FROM cursos WHERE docente_email = $1`, [user.email]),
        this.ds.query(`SELECT COUNT(*)::int AS count FROM tareas WHERE docente_email = $1 AND estado = 'pendiente'`, [user.email]),
      ]);
      return {
        role: user.role,
        cards: [
          { title: 'Cursos a cargo', value: cursos[0].count },
          { title: 'Tareas por revisar', value: pendientes[0].count },
        ],
      };
    }

    // 🧪 Fase temporal (si DOC_ONLY=false) para tu Gmail:
    // Puedes devolver métricas "read-only" o vacías.
    return {
      role: user.role, // probablemente 'estudiante' para cuentas no-docentes
      cards: [
        { title: 'Acceso temporal', value: 1 },
        { title: 'Solo docentes al finalizar', value: 0 },
      ],
    };
  }
}
