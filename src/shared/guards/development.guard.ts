import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class DevelopmentGuard implements CanActivate {
    canActivate(_context: ExecutionContext): boolean {
        if ((process.env.APP_ENV || 'local').toUpperCase() === 'PRODUCTION') {
            throw new ForbiddenException('This route is disabled.');
        }
        return true;
    }
}
