import { Logger } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { SuperConfigOptions } from "src/infra/super-config/super-config.interface";
import { UmzugService } from "src/infra/umzug/umzug.service";

export interface BootstrapFunctionArgs {
    app: NestFastifyApplication;
    config?: SuperConfigOptions;
    logger: Logger;
    umzug: UmzugService
}