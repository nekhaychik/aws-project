import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AwsModuleOptions } from 'libs/aws';

dotenv.config();

@Injectable()
export class AwsConfigService {
  public createAwsOptions(): AwsModuleOptions {
    return {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      bucket: process.env.AWS_BUCKET,
      endpoint: process.env.AWS_ENDPOINT,
      forcePathStyle: true,
      region: process.env.AWS_REGION,
    };
  }
}
