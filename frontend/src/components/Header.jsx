import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Header = () => {
  const { AUTH_API_URL, user, setUser } = useContext(AppContext);

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
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${AUTH_API_URL}/logout`);

      if (data.success) setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const username = user?.username;

  return (
    <header className="flex justify-between items-center px-6 py-5 border-b border-gray-200 bg-white shadow-sm">
      <Link to="/" className="font-extrabold text-3xl tracking-tight hover:text-blue-600 transition-colors">
        Blog 
      </Link>

      <nav className="flex items-center gap-x-6">

        {username && (
          <>
            <Link 
              to="/create" 
              className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Stwórz artykuł
            </Link>

            <button 
              onClick={logout}
              className="text-lg font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Wyloguj się
            </button>
          </>
        )}

        {!username && (
          <>
            <Link 
              to="/login" 
              className="text-lg font-semibold px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Zaloguj się
            </Link>

            <Link 
              to="/register" 
              className="text-lg font-semibold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Zarejestruj się
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
