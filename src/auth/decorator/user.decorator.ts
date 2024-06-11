import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// định nghĩa kiểu req mong muốn
export const GetUser = createParamDecorator(
  (
    key: string,
    context: ExecutionContext
  ) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    const { user } = request as any;

    return key ? user[key] : user;
  },
);