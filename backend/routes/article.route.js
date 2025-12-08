import express from 'express'
import { post, get, getArticle } from '../controllers/article.controller.js';
import { requireAuth } from "../middleware/authMiddleware.js";
import multer from 'multer'
const uploadMiddleware = multer({dest: 'uploads/', limits: {fieldSize: 10 * 1024 * 1024}})

const articleRouter = express.Router();

articleRouter.post("/post", requireAuth, uploadMiddleware.single('file'), post)
articleRouter.get("/post", get)
articleRouter.get("/post/:id", getArticle)

export default articleRouter