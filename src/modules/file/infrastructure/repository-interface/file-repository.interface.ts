import { Types } from 'mongoose';

export interface AddFileParameters {
  url: string;
  key: string;
}

export interface DeleteFileParameters {
  _id: Types.ObjectId;
}

export interface GetFileParameters {
  key: string;
}
