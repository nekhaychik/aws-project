import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from '../application';
import { DeleteFileInput } from './inputs';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/add-file')
  @UseInterceptors(FileInterceptor('file'))
  public async addFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.fileService.addFile({ file });
    return { data };
  }

  @Delete(':subPath/:name')
  public deleteFile(@Param() { subPath, name }: DeleteFileInput) {
    return this.fileService.deleteFile({ key: subPath + '/' + name });
  }

  @Get(':folder')
  public getFolderSize(@Param() { folder }) {
    return this.fileService.getFolderSize({ subPath: folder });
  }
}
