import express from 'express';
import { post, get, getArticle } from '../controllers/article.controller.js';
import { requireAuth } from "../middleware/authMiddleware.js";
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinary.js';
import dotenv from 'dotenv';
dotenv.config();

let uploadMiddleware;

if (process.env.NODE_ENV === 'production') {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'blog_articles',
      allowed_formats: ['jpg','jpeg','png','gif'],
    },
  });
  uploadMiddleware = multer({ storage });
} else {
  uploadMiddleware = multer({
    dest: 'uploads/',
    limits: { fieldSize: 10 * 1024 * 1024 },
  });
}

const articleRouter = express.Router();

articleRouter.post("/post", requireAuth, uploadMiddleware.single('file'), post);
articleRouter.get("/post", get);
articleRouter.get("/post/:id", getArticle);

export default articleRouter;