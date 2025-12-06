import express from 'express';
const app = express()

app.get('/test', (req, res) => {
    res.json('ok')
})

app.listen(3000);