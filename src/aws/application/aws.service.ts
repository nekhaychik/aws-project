import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: 'YCAJEKhB-QGI7z-nHfio6MNXl',
        secretAccessKey: 'YCPk0Tc89mYsXdxI8Wl3XnOqyINF10fCdwEQa8sh',
      },
      endpoint: 'https://storage.yandexcloud.net',
      forcePathStyle: true,
      region: 'ru-central1',
    });

    // this.bucket =
  }
}
