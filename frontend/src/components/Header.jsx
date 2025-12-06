import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="flex justify-between mx-5 py-5">
        <Link to="/" className="font-bold text-4xl">Mój blog</Link>
        <nav className="flex gap-x-5">
            <Link to="/login" className="text-2xl border rounded-lg px-2">Zaloguj się</Link>
            <Link to="/register" className="text-2xl border rounded-lg px-2">Zarejestruj się</Link>
        </nav>
    </header>
  )
}

export default Header
