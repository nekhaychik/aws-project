import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { AwsService } from 'libs/aws';

import { FileDomain } from '../domain';
import { AddFileParameters, DeleteFileParameters } from './file-service.type';

@Injectable()
export class FileService {
  constructor(private readonly fileDomain: FileDomain, private readonly awsService: AwsService) {}

  public async addFile({ file }: AddFileParameters) {
    try {
      const { url, key } = await this.awsService.putFile({
        extension: file.mimetype.split('/')[1],
        file: file.buffer,
        name: v4(),
        mimetype: file.mimetype,
      });

      return this.fileDomain.addFile({ url, key });
    } catch (err) {
      console.log(file);
      console.log('service');
      throw new BadRequestException(err.message);
    }
  }

  public async deleteFile({ key }: DeleteFileParameters) {
    try {
      const { _id } = await this.fileDomain.getFileByKey({ key });

      await this.awsService.deleteFile({ key });
      await this.fileDomain.deleteFile({ _id });

      return { data: true };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
