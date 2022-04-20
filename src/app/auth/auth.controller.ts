import { Controller } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
