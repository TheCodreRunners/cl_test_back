import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export function AuthDecorator() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
