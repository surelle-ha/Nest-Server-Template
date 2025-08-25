import { NestFactory } from '@nestjs/core';
import { BootstrapModule } from './bootstrap.module';
import { SuperConfigService } from './infra/super-config/super-config.service';
import { VersionConfig } from './shared/configs/version.config';
import { CorsConfig } from './shared/configs/cors.config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import underPressure from '@fastify/under-pressure';
import { UnderPressureConfig } from './shared/configs/under-pressure.config';
import { BootstrapFunctionArgs } from './shared/interfaces/bootstrap-function.interface';
import { Logger, ValidationPipe } from '@nestjs/common';
import { UmzugService } from './infra/umzug/umzug.service';
import { ResponseFormatInterceptor } from './shared/interceptors/response-format.interceptor';
import view from '@fastify/view';
import { ViewConfig } from './shared/configs/view.config';
import { ValidationPipeConfig } from './shared/configs/validation.config';

async function executeConfig(server: BootstrapFunctionArgs): Promise<void> {
  // Config Level
  server.config?.ENABLE_SHUTDOWN_HOOKS && server.app.enableShutdownHooks();
  server.app.enableVersioning(VersionConfig);
  server.app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));
  server.logger.log(`Configurations have been set up successfully.`);

  // Middleware Level
  server.config?.ENABLE_HELMET && await server.app.register(helmet);
  server.config?.ENABLE_CORS && await server.app.register(cors, CorsConfig);
  server.config?.ENABLE_COMPRESSION && await server.app.register(compress);
  server.config?.ENABLE_UNDER_PRESSURE && await server.app.register(underPressure, UnderPressureConfig);
  server.config?.ENABLE_VIEW && await server.app.register(view, ViewConfig);
  server.logger.log(`Middlewares have been set up successfully.`);

  // Intercetor Level
  server.app.useGlobalInterceptors(new ResponseFormatInterceptor());
  server.logger.log(`Interceptors have been set up successfully.`);
}

async function executeServer(server: BootstrapFunctionArgs): Promise<void> {
  await server.app.listen({ host: server.config?.APP_HOST, port: server.config?.APP_PORT });
  server.logger.log(`Application is running on: http://${server.config?.APP_HOST}:${server.config?.APP_PORT}`);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(BootstrapModule, new FastifyAdapter());
  const server: BootstrapFunctionArgs = {
    app,
    config: app.get(SuperConfigService).env,
    logger: new Logger('BootstrapLoader'),
    umzug: app.get(UmzugService),
  }

  try {
    await server.umzug.update();

    await executeConfig(server);
    await executeServer(server);
  } catch (error) {
    await server.umzug.rollback();
    server.logger.error(`Error occurred during server start: ${error.message}. Database migration failed.`);
  }
}

bootstrap();
