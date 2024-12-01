import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

//Propias
import { payloadTokenInterface } from '../interface/token-payload.interface';
import { AuthService } from '../auth.service';
import { configVariable } from '../../config';
import { User } from '../../components';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(configVariable.KEY)
    configService: ConfigType<typeof configVariable>,
    private readonly authService: AuthService,
  ) {
    super({
      secretOrKey: configService.JWT.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: payloadTokenInterface): Promise<User> {
    const { id } = payload;
    const user = await this.authService.validateUser(id);
    return user; // req.user
  }
}
