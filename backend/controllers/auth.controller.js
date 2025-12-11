import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({success: false, message: "Brak danych"})
        }

        const existingUser = await User.findOne({ $or: [{username}, {email}]})

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10)
            await User.create({username, email, password: hashedPassword})
            return res.status(200).json({success: true, message: "Rejestracja udana"})
        }

        return res.status(409).json({success: false, message: "Użytkownik już istnieje"})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {
            return res.status(400).json({success: false, message: "Nazwa użytkownika i hasło są wymagane"})
        }

        const user = await User.findOne({username})

        if (!user) {
            return res.status(401).json({success: false, message: "Zła nazwa użytkownika lub hasło"});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({success: false, message: "Zła nazwa użytkownika lub hasło"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({success: true, user})
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const me = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Nie zalogowany" });

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json({ message: "Nieprawidłowy token" });

    try {
      const user = await User.findById(info.id);
      if (!user) return res.status(404).json({ message: "Nie znaleziono użytkownika" });

      res.json({ username: user.username });
    } catch (error) {
      res.status(500).json({ message: "Błąd serwera" });
    }
  });
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({success: true, message: "Wylogowano"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
