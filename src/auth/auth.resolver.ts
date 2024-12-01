import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

//Propios
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { LoginInput } from './dto/login.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { ROLES } from '../config';
import { User } from '../components';

@Resolver(() => AuthResolver)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {
    name: 'signup',
    description: 'Para registrar un usuario',
  })
  @UseGuards(JwtAuthGuard)
  async signup(
    @Args('signupInput') signupInput: SignupInput,
    @CurrentUser([ROLES.USER_CREATE]) user: User,
  ): Promise<AuthResponse> {
    return await this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, {
    name: 'login',
    description: 'Para loguear el usuario',
  })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return await this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revaliteToken' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser([]) user: User): Promise<AuthResponse> {
    return this.authService.revalidateToken(user);
  }
}
