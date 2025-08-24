import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync } from 'fs';
import { join } from 'path';
import { HeaderSettingsOptions, ResponseFormatResponse } from '../interfaces/response-format.interface';

@Injectable()
export class ResponseFormatInterceptor<T>
    implements NestInterceptor<T, T | ResponseFormatResponse> {
    private readonly logger = new Logger(ResponseFormatInterceptor.name);

    private get fallbackValue() {
        return {
            NO_SERVER_INFO: 'Unable to retrieve server information',
            NO_CLIENT_INFO: 'No client detected',
        };
    }

    private getPackageData(): any {
        const packageJsonPath = join(process.cwd(), 'package.json');
        return JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    }

    private getTimeZone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    private getApiService(): string {
        try {
            return this.getPackageData().name;
        } catch (error) {
            this.logger.error('Error reading package.json:', error);
            return this.fallbackValue.NO_SERVER_INFO;
        }
    }

    private getApiVersion(): string {
        try {
            return this.getPackageData().version;
        } catch (error) {
            this.logger.error('Error reading package.json:', error);
            return this.fallbackValue.NO_SERVER_INFO;
        }
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<T | ResponseFormatResponse> {
        const request = context.switchToHttp().getRequest();

        const headerSettings: HeaderSettingsOptions = {
            withTemplate:
                request.headers['response-template'] !== 'false' &&
                !request.headers['no-response-template'],
            clientVersion: request.headers['x-client-version'],
            clientTimezone: request.headers['x-client-timezone'],
        };

        return next.handle().pipe(
            map((data) => {
                if (!headerSettings.withTemplate) {
                    return data;
                }

                return {
                    traceId: uuidv4(),
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    timestamp: new Date().toISOString(),
                    method: request.method,
                    path: request.url,
                    data,
                    api: {
                        service: this.getApiService() || this.fallbackValue.NO_SERVER_INFO,
                        version: this.getApiVersion() || this.fallbackValue.NO_SERVER_INFO,
                        datetime: new Date().toISOString() || this.fallbackValue.NO_SERVER_INFO,
                        timezone: this.getTimeZone() || this.fallbackValue.NO_SERVER_INFO,
                    },
                    client: {
                        version:
                            headerSettings.clientVersion ||
                            this.fallbackValue.NO_CLIENT_INFO,
                        timezone:
                            headerSettings.clientTimezone ||
                            this.fallbackValue.NO_CLIENT_INFO,
                    },
                } as ResponseFormatResponse;
            }),
        );
    }
}
