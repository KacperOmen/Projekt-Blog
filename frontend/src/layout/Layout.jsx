import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const Layout = () => {
  return (
    <main className="w-[80%] mx-auto">
        <Header />     
        <Outlet />
    </main>
  )
}

export default Layout
