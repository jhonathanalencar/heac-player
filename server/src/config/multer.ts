import multer from "multer";
import path from 'path';
import crypto from 'crypto';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) =>{
      if(file.mimetype.includes('image')){
        cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'images'));
      }else{
        cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'videos'));
      }
    },
    filename: (req, file: Express.Multer.File & {key: string}, cb) =>{
      crypto.randomBytes(16, (err, hash) =>{
        if(err) cb(err, '');

        file.key = `${hash.toString('hex')}-${file.originalname}`;
        
        cb(null, file.key);
      });
    },
  }),
}

export const multerConfig: multer.Options  = {
  // dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['local'],
  limits: {},
  fileFilter: (req, file, cb) =>{
    const allowedMimes = [
      'video/mp2t',
      'video/mp4',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if(allowedMimes.includes(file.mimetype)){
      cb(null, true);
    }else{
      cb(new Error('Invalid file type.'));
    }
  },
}