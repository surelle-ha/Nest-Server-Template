import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
  });

  it('should return server ready message', () => {
    expect(service.check()).toEqual({ message: 'Server is ready.' });
  });
});
