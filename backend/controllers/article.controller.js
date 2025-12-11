import fs from 'fs'
import Post from '../models/post.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const post = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Zdjęcie jest wymagane" });
    }

    const { token } = req.cookies;

    const {title, summary, content} = req.body

    if (!title) {
      return res.status(400).json({ message: "Tytuł jest wymagany" });
    }

    if (!summary) {
      return res.status(400).json({ message: "Streszczenie jest wymagane" });
    }

    if (!content || content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      return res.status(400).json({ message: "Treść artykułu nie może być pusta" });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) return res.status(401).json({ message: "Nieprawidłowy token" });
    
        try {
          let coverPath

          if (process.env.NODE_ENV === 'production') {
            coverPath = req.file.path
          }
          else {
            const {originalname, path} = req.file
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = path + '.' + ext
            fs.renameSync(path, newPath)
            coverPath = newPath
          }

          const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: coverPath,
            author: info.id,
          })  

          res.json(postDoc);
        } catch (error) {
          console.log(error)
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