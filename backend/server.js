import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://user:lXnIB0fAPtqYthj5@blogcluster.hm2ilky.mongodb.net/?appName=BlogCluster")
.then(() => {
    console.log("Connected to database")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(() => {
    console.log("Connection failed")
})