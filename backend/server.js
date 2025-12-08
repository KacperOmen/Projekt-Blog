import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js';
import articleRouter from './routes/article.route.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRouter)
app.use("/api/article", articleRouter)

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_STRING_CONNECTION)
.then(() => {
    console.log("Connected to database")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(() => {
    console.log("Connection failed")
})