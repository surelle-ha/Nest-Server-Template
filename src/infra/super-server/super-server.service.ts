import { Injectable, Logger } from '@nestjs/common';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class SuperServerService {
    private readonly logger = new Logger(SuperServerService.name);

    private readonly packageJson: { name: string; version: string };

    constructor() {
        const packagePath = path.resolve(__dirname, '../../../package.json');
        if (fs.existsSync(packagePath)) {
            this.packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
        } else {
            this.packageJson = { name: 'Unknown', version: '0.0.0' };
        }
    }

    getMetrics() {
        this.logger.debug('Fetching server config...');

        const cpus = os.cpus();
        const network = os.networkInterfaces();

        return {
            name: this.packageJson.name,
            version: this.packageJson.version,
            server: {
                hostname: os.hostname(),
                platform: os.platform(),
                arch: os.arch(),
                uptime: os.uptime(), // in seconds
                loadAverage: os.loadavg(), // 1, 5, 15 min averages
                totalMemory: os.totalmem(),
                freeMemory: os.freemem(),
                cpus: cpus.map(cpu => ({ model: cpu.model, speed: cpu.speed })),
                networkInterfaces: network,
            },
            env: {
                nodeEnv: process.env.APP_ENV,
                port: process.env.APP_PORT,
                jwtSecretConfigured: !!process.env.APP_SECRET,
            },
            process: {
                pid: process.pid,
                memoryUsage: process.memoryUsage(), // heapUsed, heapTotal, rss
                versions: process.versions, // node, v8, openssl, etc.
                uptime: process.uptime(),
            }
        };
    }
}
