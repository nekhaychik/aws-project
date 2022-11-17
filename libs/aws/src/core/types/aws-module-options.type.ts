import { S3ClientConfig } from '@aws-sdk/client-s3';

export interface AwsModuleOptions extends S3ClientConfig {
  bucket: string;
  endpoint: string;
}
