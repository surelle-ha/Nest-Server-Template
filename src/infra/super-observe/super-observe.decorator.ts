import { SetMetadata } from '@nestjs/common';

export const SUPER_OBSERVE_KEY = 'SUPER_OBSERVE_KEY';

export const UsePerformance = () => SetMetadata(SUPER_OBSERVE_KEY, true);
