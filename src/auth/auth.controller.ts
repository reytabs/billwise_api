import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{
    token: string;
    success: boolean;
    header: string;
    statusCode: number;
    message: string;
  }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{
    token: string;
    success: boolean;
    header: string;
    statusCode: number;
    message: string;
    name: string;
    email: string;
  }> {
    return this.authService.login(loginDto);
  }
}
