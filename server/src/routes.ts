import express from "express";
import multer from "multer";

import { multerConfig } from "./config/multer";
import { File } from "./models/File";

const router = express.Router();

router.get('/uploads', async (req, res) =>{
  const files = await File.find({});

  if(!files){
    return res.status(404).json({ msg: "No files found." });
  }

  return res.json(files);
})

router.post('/uploads', multer(multerConfig).array('file', 2), async (req, res) =>{
  const { files } = req;

  if(!files){
    return res.status(400).json({ msg: "Please provide files." });
  }
  
  const formattedFiles = files as (Express.Multer.File & {key: string, url: string} | undefined)[];
  
  const videoFile = formattedFiles[0];
  const imageFile = formattedFiles[1];
  
  const newFile = await File.create({
    title: req.body.title,
    name: videoFile?.originalname,
    key: videoFile?.key,
    thumbnailId: imageFile?.key,
  });

  return res.status(201).json(newFile);
});

router.get('/uploads/:id', async (request, response) =>{
  const { id } = request.params;

  if(!id){ 
    return response.status(400).json({ msg: "Please provide id." });
  }

  const existingFile = await File.findById(id);

  if(!existingFile){ 
    return response.status(404).json({ msg: "No file found." });
  }

  return response.status(200).json(existingFile);
});

router.delete('/uploads/:id', async (request, response) =>{
  const { id } = request.params;

  if(!id){ 
    return response.status(400).json({ msg: "Please provide id." });
  }

  const file = await File.findById(id);

  if(!file){ 
    return response.status(404).json({ msg: "No file found." });
  }

  const deletedFile = await file.remove();

  return response.status(200).json(deletedFile);
});

export { router }