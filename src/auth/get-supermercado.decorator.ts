/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';

export const GetSuper = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.supermercado)
    return request.user.supermercado;
  },
);
