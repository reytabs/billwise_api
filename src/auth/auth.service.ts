import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{
    token: string;
    success: boolean;
    header: string;
    statusCode: number;
    message: string;
  }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    let token;
    try {
      const newUser = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      token = this.jwtService.sign({ id: newUser._id });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already in use.');
      }
    }

    return {
      token,
      success: true,
      header: 'Registration',
      statusCode: 201,
      message: 'Account is succssfully registered.',
    };
  }

  async login(loginDto: LoginDto): Promise<{
    token: string;
    success: boolean;
    header: string;
    statusCode: number;
    message: string;
    name: string;
    email: string;
  }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new UnauthorizedException('Invalid credentials.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials.');

    const token = this.jwtService.sign({ id: user._id });
    return {
      token,
      success: true,
      header: 'Successful',
      statusCode: 200,
      message: 'Login successful',
      name: user.name,
      email: user.email,
    };
  }
}
