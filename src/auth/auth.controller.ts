import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

//Propio
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { JwtAuthGuardHttp } from './guards/jwt-auth.guard';
import { CurrentUserHttp } from './decorators/current-user.decorator';
import { User } from '../components';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInput: LoginInput, @Res() res: Response) {
    const { token, user } = await this.authService.login(loginInput);
    const { password, ...resp } = user;

    return res.status(200).json({ token, ...resp });
  }

  @Get('revaliteToken')
  @UseGuards(JwtAuthGuardHttp)
  async revalidateToken(@CurrentUserHttp([]) user: User) {
    return await this.authService.revalidateToken(user);
  }
}
