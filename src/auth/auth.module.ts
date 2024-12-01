import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

//Propio
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { configVariable } from '../config';
import { UsersModule } from '../components';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [configVariable.KEY],
      useFactory: (configService: ConfigType<typeof configVariable>) => {
        return {
          secret: configService.JWT.JWT_SECRET,
          signOptions: {
            expiresIn: configService.JWT.JWT_EXPIRE,
          },
        };
      },
    }),

    UsersModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
