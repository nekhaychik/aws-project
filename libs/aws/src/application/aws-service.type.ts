export interface GetKeyParameters {
  subPath?: string;
  extension?: string;
  name: string;
}

export interface GetSignedUrlParameters {
  key: string;
}

export interface PutFileParameters {
  extension?: string;
  file: Buffer;
  mimetype?: string;
  name: string;
  subPath?: string;
}

export interface DeleteFileParameters {
  key: string;
}
