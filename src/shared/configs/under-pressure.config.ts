import { FastifyUnderPressureOptions } from '@fastify/under-pressure';

export const UnderPressureConfig: FastifyUnderPressureOptions = {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1e9,
    maxRssBytes: 1e9,
    healthCheck: async () => {
        return { status: 'ok' };
    },
    healthCheckInterval: 5000,
};
