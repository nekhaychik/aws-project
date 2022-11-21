export interface AddFileParameters {
  file: Express.Multer.File;
}

export interface DeleteFileParameters {
  key: string;
}

export interface GetFolderSizeParameters {
  subPath?: string;
}
