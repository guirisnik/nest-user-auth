import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginRequest } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password == password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    return { accessToken: this.jwtService.sign(request) };
  }
}
