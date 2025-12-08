import express from 'express'
import { post } from '../controllers/article.controller.js';
import multer from 'multer'
const uploadMiddleware = multer({dest: 'uploads/'})

const articleRouter = express.Router();

articleRouter.post("/post", uploadMiddleware.single('file'), post)

export default articleRouter