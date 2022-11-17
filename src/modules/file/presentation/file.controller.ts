import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from '../application';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/add-file')
  @UseInterceptors(FileInterceptor('file'))
  public addFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.addFile({ file });
  }

  @Delete(':subPath/:name')
  public deleteFile(@Param() { subPath, name }) {
    return this.fileService.deleteFile({ key: subPath + '/' + name });
  }
}
