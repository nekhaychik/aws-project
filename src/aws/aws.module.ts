import { Module } from '@nestjs/common';
import { AwsService } from './application';

@Module({
  // exports: [AwsService],
  providers: [AwsService],
})
export class AwsModule {}
