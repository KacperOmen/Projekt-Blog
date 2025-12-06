import { Link } from "react-router-dom"
import { useEffect, useContext } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"

const Header = () => {
  const {AUTH_API_URL, user, setUser} = useContext(AppContext)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${AUTH_API_URL}/me`, {
          withCredentials: true,
        });

        setUser(data);
      } catch (err) {
        console.error("Nie udało się pobrać użytkownika:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [])

  const logout = async (e) => {
    try {
      e.preventDefault()

      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${AUTH_API_URL}/logout`)

      if (data.success) {
        setUser(null);
      }
      else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const username = user?.username

  return (
    <header className="flex justify-between mx-5 py-5">
        <Link to="/" className="font-bold text-4xl">Mój blog</Link>
        <nav className="flex gap-x-5">
            {username && 
              <>
                <Link to="/create">Stwórz nowy artykuł</Link>
                <a onClick={logout}>Wyloguj się</a>
              </>
            }
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
