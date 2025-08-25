import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SUPER_OBSERVE_KEY } from './super-observe.decorator';
import { SuperObserve } from './super-observe.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SuperObserveInterceptor implements NestInterceptor {
    private readonly logger = new Logger(SuperObserveInterceptor.name);

    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isObserved = this.reflector.get<boolean>(
            SUPER_OBSERVE_KEY,
            context.getHandler(),
        );

        if (!isObserved) return next.handle();

        const req = context.switchToHttp().getRequest();
        const route = req.url;
        const beforeTime = new Date();

        return next.handle().pipe(
            tap(() => {
                const afterTime = new Date();
                const duration = afterTime.getTime() - beforeTime.getTime();
                const status = context.switchToHttp().getResponse().statusCode;
                SuperObserve.create({
                    route,
                    beforeTime,
                    afterTime,
                    computedSpeed: duration,
                    responseStatus: status,
                    loggedAt: new Date(),
                } as any).catch(err => this.logger.error('Failed to log performance', err));
            }),
        );
    }
}
