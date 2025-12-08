import fs from 'fs'
import Post from '../models/post.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const post = async (req, res) => {
    const {originalname, path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    const { token } = req.cookies;

    const {title, summary, content} = req.body
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) return res.status(401).json({ message: "Nieprawidłowy token" });
    
        try {
          const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
          })  

          res.json(postDoc);
        } catch (error) {
          res.status(500).json({ message: "Błąd serwera" });
        }
      });
}

export const get = async (req, res) => {
    const posts = await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(20);
    res.json(posts)
}

export const getArticle = async (req, res) => {
    const {id} = req.params
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)
}