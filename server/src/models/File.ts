import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

interface IFile {
  title: string;
  name: string;
  key: string;
  url?: string;
  thumbnailUrl?: string;
  thumbnailId: string;
  createdAt: Date;
}

const FileSchema = new mongoose.Schema<IFile>({
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  key: {
    type: String,
    required: [true, 'Please provide key'],
    unique: true,
  },
  url: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  thumbnailId: {
    type: String,
    required: [true, 'Please provide thumbnail id'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FileSchema.pre('save', function(){
  if(!this.url){
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }

  if(!this.thumbnailUrl){
    this.thumbnailUrl = `${process.env.APP_URL}/files/${this.thumbnailId}`;
  }
});

FileSchema.pre('remove', function(){
  promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'videos' ,this.key)
  );
  if(this.thumbnailUrl){
    promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'images' ,this.thumbnailId)
    );
  }
});

export const File = mongoose.model<IFile>('File', FileSchema);