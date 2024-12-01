import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

//Propio
import { MESSAGE } from '../../config';
import { User } from '../../components';

//Este decorador me devolverar el user que se encuentra en el Req de la peticion en la propiedad .user ...
//Siempre y cuando haga pasado por la validacion del token
export const CurrentUser = createParamDecorator(
  (roles: string[], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException(
        `${MESSAGE.PORFAVOR_COMUNICARSE_CON_EL_ADMINISTRADOR} => Not user in Req`,
      );
    }

    const auth = ctx.getContext().req.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException(
        `${MESSAGE.PORFAVOR_COMUNICARSE_CON_EL_ADMINISTRADOR} => not authorization in Req`,
      );
    }
    //!Quite que el usuario solo peuda usar un token
    //const [, token] = auth.split(' ');
    //if (token != user.token) {
    //  throw new UnauthorizedException(MESSAGE.ESTE_TOKEN_YA_EXPIRO);
    //}

    //Aqui verifico a el usuario si no tiene roles lo dejo apsar
    if (roles.length == 0) {
      return user;
    }

    for (const role of user.role) {
      for (const actionActual of role.permiso_accion) {
        if (roles.includes(actionActual.action)) {
          if (actionActual.action) {
            return user;
          } else {
            throw new UnauthorizedException(
              `${MESSAGE.ESTE_ROL_ESTA_INACTIVO} => ${actionActual.action}`,
            );
          }
        }
      }
    }
    throw new ForbiddenException(
      `${MESSAGE.NO_TIENE_EL_ROL_PARA_ESTA_ACCION} => ${roles}`,
    );
  },
);

export const CurrentUserHttp = createParamDecorator(
  (roles: string[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user) {
      throw new InternalServerErrorException(
        `${MESSAGE.PORFAVOR_COMUNICARSE_CON_EL_ADMINISTRADOR} => Not user in Req`,
      );
    }

    const auth = request.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException(
        `${MESSAGE.PORFAVOR_COMUNICARSE_CON_EL_ADMINISTRADOR} => not authorization in Req`,
      );
    }
    //! Quite que el suuario solo peuda usar un token
    //const [, token] = auth.split(' ');
    //if (token != user.token) {
    //  throw new UnauthorizedException(MESSAGE.ESTE_TOKEN_YA_EXPIRO);
    //}

    //Aqui verifico a el usuario si no tiene roles lo dejo apsar
    if (roles.length == 0) {
      return user;
    }

    for (const role of user.role) {
      for (const actionActual of role.permiso_accion) {
        if (roles.includes(actionActual.action)) {
          if (actionActual.action) {
            return user;
          } else {
            throw new UnauthorizedException(
              `${MESSAGE.ESTE_ROL_ESTA_INACTIVO} => ${actionActual.action}`,
            );
          }
        }
      }
    }
    throw new ForbiddenException(
      `${MESSAGE.NO_TIENE_EL_ROL_PARA_ESTA_ACCION} => ${roles}`,
    );
  },
);
