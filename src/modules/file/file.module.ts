import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileService } from './application';
import { FileDomain } from './domain';
import { FileModel, FileModelSchema, FileRepository } from './infrastructure';
import { FileController } from './presentation';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileModel.name, schema: FileModelSchema }])],
  controllers: [FileController],
  providers: [FileService, FileDomain, FileRepository],
})
export class FileModule {}
