import express from 'express'
import {register, login, me, logout} from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/me', me)
authRouter.post('/logout', logout)

export default authRouter