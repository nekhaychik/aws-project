import { Injectable, Inject } from '@nestjs/common';
import { DeleteObjectCommand, GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AwsModuleOptions, AWS_MODULE_OPTIONS_TOKEN, FileData } from '../core';
import {
  DeleteFileParameters,
  GetFolderSizeParameters,
  GetKeyParameters,
  GetSignedUrlParameters,
  PutFileParameters,
} from './aws-service.type';

@Injectable()
export class AwsService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(@Inject(AWS_MODULE_OPTIONS_TOKEN) private readonly options: AwsModuleOptions) {
    const { bucket, ...s3ClientOptions } = options;

    this.bucket = bucket;
    this.s3Client = new S3Client(s3ClientOptions);
  }

  public getKey({ extension, name, subPath = 'b' }: GetKeyParameters): string {
    return `${subPath}/${name}.${extension}`;
  }

  public async getSignedUrl({ key }: GetSignedUrlParameters): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command);
  }

  public async putFile({ extension, file, mimetype, name, subPath = 'b' }: PutFileParameters): Promise<FileData> {
    if (!file) {
      return undefined;
    }

    const key = this.getKey({
      subPath,
      extension,
      name,
    });

    const command = new PutObjectCommand({
      Body: file,
      Bucket: this.bucket,
      ContentType: mimetype,
      Key: key,
    });

    await this.s3Client.send(command);

    const fullUrl = await this.getSignedUrl({ key });

    return {
      key,
      url: fullUrl.split('?')[0],
    };
  }

  public async deleteFile({ key }: DeleteFileParameters): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  public async getFolderSize({ subPath = 'b' }: GetFolderSizeParameters) {
    const command = new ListObjectsCommand({
      Bucket: this.bucket,
      Prefix: `${subPath}/`,
    });

    const list = await this.s3Client.send(command);

    const size = list.Contents.reduce((acc, file) => {
      return acc + file.Size;
    }, 0);

    return size;
  }
}
