import { Injectable, Logger, Render } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RenderService {
  private readonly logger = new Logger(RenderService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  pingSelf() {
    this.logger.debug('Send self-ping to prevent idling.');
    fetch('https://api-nest-surelle-com.onrender.com/api/v1/health')
      .then(() => this.logger.debug('Self-ping successful'))
      .catch((error) => this.logger.error('Self-ping failed', error));
  }
}
