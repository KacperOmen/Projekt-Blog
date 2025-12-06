
const Header = () => {
  return (
    <header className="flex justify-between mx-5 py-5">
        <a href="#" className="font-bold text-4xl">Mój blog</a>
        <nav className="flex gap-x-5">
            <a href="#" className="text-2xl border rounded-lg px-2">Zaloguj się</a>
            <a href="#" className="text-2xl border rounded-lg px-2">Zarejestruj się</a>
        </nav>
    </header>
  )
}

export default Header
