import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() { }

  check() {
    return {
      message: 'Server is ready.',
    };
  }
}
