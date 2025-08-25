import { FastifyViewOptions } from '@fastify/view';
import { join } from 'path';

export const ViewConfig: FastifyViewOptions = {
    engine: {
        ejs: require('ejs'),
    },
    root: join(__dirname, '..', '..', 'views', 'resource'),
    layout: '',
    includeViewExtension: true,
}