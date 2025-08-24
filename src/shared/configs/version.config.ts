import { VersioningOptions, VersioningType } from '@nestjs/common';

export const VersionConfig: VersioningOptions = {
  type: VersioningType.URI,
  defaultVersion: '1',
  prefix: 'api/v',
};
