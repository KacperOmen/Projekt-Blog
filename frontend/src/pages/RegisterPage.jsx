import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { AppContext } from "../context/AppContext"

const RegisterPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {AUTH_API_URL} = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${AUTH_API_URL}/register`, {username, email, password})

      if (data.success) {
        navigate('/login')
      }
      else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full flex justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">          
            <p className="text-center text-2xl mb-6">
                Załóż konto
            </p>
            <div className="mb-4 flex items-end gap-3">
                <label htmlFor="username" className="block text-lg mb-2 whitespace-nowrap">Login</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="border w-full p-2 rounded" 
                    placeholder="Wprowadź nazwę użytkownika"
                    required
                />
            </div>
            <div className="mb-4 flex items-end gap-3">
                <label htmlFor="username" className="block text-lg mb-2 whitespace-nowrap">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border w-full p-2 rounded" 
                    placeholder="Wprowadź email"
                    required
                />
            </div>
            <div className="mb-4 flex items-end gap-3">
                <label htmlFor="password" className="block text-lg mb-2">Hasło</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="border w-full p-2 rounded" 
                    placeholder="Wprowadź hasło"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-700 transition">
                Zarejetruj się
            </button>
            <p className="mt-6 text-center text-sm">
                Masz już konto?
                <Link to="/login" className="text-blue-500"> Zaloguj się</Link>
            </p>
        </form>
    </div>
  )
}

export default RegisterPage
