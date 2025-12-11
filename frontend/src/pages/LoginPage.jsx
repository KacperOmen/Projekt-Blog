import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const {AUTH_API_URL, setUser} = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg("")

    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(`${AUTH_API_URL}/login`, {username, password})

      if (data.success) {
        setUser(data.user)
        navigate("/")
      }
      else {
        setErrorMsg(data.message)
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message)
      } else {
        setErrorMsg("Błąd serwera. Spróbuj ponownie.")
      }
    }
  }

  return (
    <div className="w-full flex justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">          
            <p className="text-center text-xl mb-6">
                Wprowadź nazwę użytkownika i hasło
            </p>
            {errorMsg && (
              <p className="text-red-600 text-center mb-4">{errorMsg}</p>
            )}
            
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
                Zaloguj się
            </button>
            <p className="mt-6 text-center text-sm">
                Nie masz konta?
                <Link to="/register" className="text-blue-500"> Zarejestruj się</Link>
            </p>
        </form>
    </div>
  )
}

export default LoginPage
