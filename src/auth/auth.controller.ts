import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';
import { ProfileResponse } from './dto/profile-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() request): ProfileResponse {
    return { email: request.user.email };
  }
}
