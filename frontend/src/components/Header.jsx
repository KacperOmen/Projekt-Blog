import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"

const Header = () => {
  const [username, setUsername]= useState(null);

  const {AUTH_API_URL} = useContext(AppContext)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${AUTH_API_URL}/me`, {
          withCredentials: true,
        });

        setUsername(data.username);
      } catch (err) {
        console.error("Nie udało się pobrać użytkownika:", err);
        setUsername(null);
      }
    };

    fetchUser();
  }, [])

  return (
    <header className="flex justify-between mx-5 py-5">
        <Link to="/" className="font-bold text-4xl">Mój blog</Link>
        <nav className="flex gap-x-5">
            {username && <Link to="/create">Stwórz nowy artykuł</Link>}
            {!username && 
              <>
                <Link to="/login" className="text-2xl border rounded-lg px-2">Zaloguj się</Link>
                <Link to="/register" className="text-2xl border rounded-lg px-2">Zarejestruj się</Link>
              </>
            }            
        </nav>
    </header>
  )
}

export default Header
