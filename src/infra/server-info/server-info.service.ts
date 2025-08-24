import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ServerInfoService {
    private readonly logger = new Logger(ServerInfoService.name);
    constructor() { }

    getConfig() {
        return {
            name: 'Core Identity Platform',
            version: '1.0.0',
            avatar: {
                url: 'https://dqtsi.com/wp-content/uploads/2025/05/dq-ai-logo.png',
                alt: 'Core Identity Platform Avatar'
            }
        };
    }
}
