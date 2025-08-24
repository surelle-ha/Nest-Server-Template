import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import * as path from 'path';

@Injectable()
export class UmzugService {
    private readonly logger = new Logger(UmzugService.name);
    private umzug: Umzug;

    constructor(private readonly sequelize: Sequelize) {
        this.umzug = new Umzug({
            migrations: {
                glob: path.join(process.cwd(), '/database/migrations/*.js'),
                resolve: ({ name, path: migrationPath, context }) => {
                    if (!migrationPath || typeof migrationPath !== 'string') {
                        throw new Error(`Migration path is invalid: ${migrationPath}`);
                    }
                    const migration = require(migrationPath);
                    return {
                        name,
                        up: async () => migration.up(context.queryInterface, Sequelize),
                        down: async () => migration.down(context.queryInterface, Sequelize),
                    };
                },
            },
            context: {
                queryInterface: this.sequelize.getQueryInterface(),
            },
            storage: new SequelizeStorage({ sequelize: this.sequelize }),
            logger: console,
        });
    }

    async getPending() {
        const pendings = await this.umzug.pending();
        this.logger.log(`Pending migrations: ${JSON.stringify(pendings)}`);
        return pendings;
    }

    async getExecuted() {
        const executed = await this.umzug.executed();
        this.logger.log(`Executed migrations: ${JSON.stringify(executed)}`);
        return executed;
    }

    async update() {
        await this.umzug.up();
    }

    async rollback() {
        await this.umzug.down();
    }
}
