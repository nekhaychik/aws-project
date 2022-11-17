import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FileDto, FileModel } from '../entity';
import { AddFileParameters, DeleteFileParameters, GetFileParameters } from '../repository-interface';

@Injectable()
export class FileRepository {
  public constructor(@InjectModel(FileModel.name) private readonly fileEntity: Model<FileDto>) {}

  public addFile({ url, key }: AddFileParameters) {
    return this.fileEntity.create({ url, key });
  }

  public deleteFile({ _id }: DeleteFileParameters) {
    return this.fileEntity.deleteOne({ _id });
  }

  public getFileByKey({ key }: GetFileParameters) {
    return this.fileEntity.findOne({ key });
  }
}
