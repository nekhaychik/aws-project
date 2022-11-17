import { Injectable } from '@nestjs/common';

import { FileRepository } from '../infrastructure';
import { AddFileParameters, DeleteFileParameters, GetFileParameters } from './file-domain.type';

@Injectable()
export class FileDomain {
  public constructor(private readonly fileRepository: FileRepository) {}

  public addFile({ url, key }: AddFileParameters) {
    try {
      return this.fileRepository.addFile({ url, key });
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteFile({ _id }: DeleteFileParameters) {
    try {
      await this.fileRepository.deleteFile({ _id });
      return true;
    } catch (err) {
      throw Error(err);
    }
  }

  public getFileByKey({ key }: GetFileParameters) {
    try {
      return this.fileRepository.getFileByKey({ key });
    } catch (err) {
      throw new Error(err);
    }
  }
}
