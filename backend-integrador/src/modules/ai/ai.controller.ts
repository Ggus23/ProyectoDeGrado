import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { DomainGuard } from '../../shared/guards/domain.guard';
@ApiTags('ai')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(JwtAuthGuard, DomainGuard)
export class AiController {
  @Post('suggest') async suggest(@Body() body: any) {
    const text = body?.prompt || '';
    const suggestion = text.includes('rúbrica')
      ? 'Considera 3-4 niveles con descriptores observables por criterio.'
      : 'Divide la unidad en hitos semanales y alinea evidencias con resultados.';
    return { provider: 'MockProvider', suggestion };
  }
}
