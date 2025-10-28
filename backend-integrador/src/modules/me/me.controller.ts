import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('me')
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(private users: UsersService) {}

  @Get()
  async me(@Req() req: any) {
    const { sub, email } = req.user;
    const user = await this.users.findOrProvisionWithPolicy(sub, email);
    return { id: user.id, email: user.email, role: user.role };
  }
}
