import express from 'express'
import { post, get } from '../controllers/article.controller.js';
import multer from 'multer'
const uploadMiddleware = multer({dest: 'uploads/', limits: {fieldSize: 10 * 1024 * 1024}})

const articleRouter = express.Router();

articleRouter.post("/post", uploadMiddleware.single('file'), post)
articleRouter.get("/post", get)

export default articleRouter