import { Document, model, Schema } from 'mongoose';

export interface FileDto {
  url: string;
  key: string;
}

export interface IFileModel extends FileDto, Document {}

export const FileModelSchema = new Schema(
  {
    url: { type: String, default: null },
    key: { type: String, default: null },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

export const FileModel = model('file', FileModelSchema);
