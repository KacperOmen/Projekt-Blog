import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js';

const app = express()

dotenv.config()

app.use("/api/auth", authRouter)

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