import { FastifyCorsOptions } from '@fastify/cors';

export const CorsConfig: FastifyCorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
};
