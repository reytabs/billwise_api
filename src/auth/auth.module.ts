import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // older env file used JWT_TOKEN, newer code expects JWT_SECRET
        const secret =
          configService.get<string>('JWT_SECRET') ||
          configService.get<string>('JWT_TOKEN');

        if (!secret) {
          // prevent the JWT library from throwing a generic error
          throw new Error('JWT secret must be configured (JWT_SECRET or JWT_TOKEN)');
        }

        return {
          secret,
          signOptions: {
            expiresIn: configService.get<string>(
              'JWT_EXPIRES_IN',
            ) as `${number}${'s' | 'm' | 'h' | 'd'}`,
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
