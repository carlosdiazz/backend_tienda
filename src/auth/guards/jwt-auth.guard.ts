import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }
}

@Injectable()
export class JwtAuthGuardHttp extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // Obtén el contexto de ejecución HTTP
    return context.switchToHttp().getRequest();
  }
}
