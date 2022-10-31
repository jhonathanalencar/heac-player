import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import { connectDB } from './db/connect';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'images')));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'videos')));

const PORT = process.env.PORT || 3333;

const start = async () =>{
  try{
    await connectDB(process.env.MONGO_URI ?? '');

    app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));
  }catch(error){
    console.log(error);
  }
}

start();