import express from 'express';
import { addComment, getComments } from '../controllers/comment.controller.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Nie zalogowany" });

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) return res.status(401).json({ message: "Nieprawidłowy token" });
    req.userId = info.id;
    next();
  });
};

router.post('/:postId', verifyToken, addComment);

router.get('/:postId', getComments);

export default router;
