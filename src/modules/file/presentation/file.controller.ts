import { Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from '../application';
import { FileDto, FolderSizeDto } from './dtos';
import { DeleteFileInput, GetFolderSizeInput } from './inputs';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/add-file')
  @UseInterceptors(FileInterceptor('file'))
  public async addFile(@UploadedFile() file: Express.Multer.File): Promise<FileDto> {
    return this.fileService.addFile({ file });
  }

  @Delete(':subPath/:name')
  public deleteFile(@Param() { subPath, name }: DeleteFileInput): Promise<{ data: boolean }> {
    return this.fileService.deleteFile({ key: subPath + '/' + name });
  }

  @Get('/get-folder-size')
  public getFolderSize(@Query() query: GetFolderSizeInput): Promise<FolderSizeDto> {
    return this.fileService.getFolderSize({ subPath: query.folder });
  }
}
