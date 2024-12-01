import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

//Propios
import { AuthResponse } from './types/auth-response.types';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { payloadTokenInterface } from './interface/token-payload.interface';
import { User, UsersService } from '../components';
import { MESSAGE } from '../config';
import { ResponsePropioGQl } from '../common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payloadToken: payloadTokenInterface) {
    return this.jwtService.sign({ id: payloadToken.id });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    const response: AuthResponse = {
      token: null,
      user: user,
    };
    return response;
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail(email);

    if (!user.activo) {
      throw new UnauthorizedException(MESSAGE.SU_USUARIO_ESTA_INACTIVO);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }

    const token = this.getJwtToken({ id: user.id });
    await this.usersService.updateToken(user.id, token);
    const response: AuthResponse = {
      token: token,
      user: user,
    };
    return response;
  }

  async logout(id: number): Promise<ResponsePropioGQl> {
    try {
      const token = null;
      await this.usersService.updateToken(id, token);
      return {
        message: MESSAGE.SE_CERRO_CORRECTAMENTE_SU_SESION,
        error: false,
      };
    } catch (e) {
      console.log(e);
      return {
        message: 'ERROR DESCONOCIDO',
        error: true,
      };
    }
  }

  //Revalidar el token del que es enviado, generar uno nuevo
  async revalidateToken(user: User): Promise<AuthResponse> {
    const token = this.getJwtToken({ id: user.id });
    await this.usersService.updateToken(user.id, token);
    const response: AuthResponse = {
      token: token,
      user: user,
    };
    return response;
  }

  async validateUser(id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user.activo) {
      throw new UnauthorizedException(MESSAGE.SU_USUARIO_ESTA_INACTIVO);
    }
    delete user.password;
    return user;
  }
}
