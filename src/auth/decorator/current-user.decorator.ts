import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interface';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req: RequestWithUser = context.switchToHttp().getRequest();
    return req.user;
  },
);
