import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({success: false, message: "Brak danych"})
        }

        const existingUser = User.findOne({ $or: [{username}, {email}]})

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10)
            User.create({username, email, password: hashedPassword})
            return res.status(200).json({success: true, message: "Rejestracja udana"})
        }

        return res.status(409).json({success: false, message: "Użytkownik już istnieje"})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}