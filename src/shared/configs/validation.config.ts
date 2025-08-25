import { ValidationPipeOptions } from '@nestjs/common';

export const ValidationPipeConfig: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
};
