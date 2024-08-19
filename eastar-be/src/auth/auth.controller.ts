import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  signin() {
    return this.authService.signin();
  }

  @Post()
  signup() {
    return this.authService.signup();
  }
}
