import { SetMetadata } from '@nestjs/common';

export const Message = (message: string) => SetMetadata('message', message);
