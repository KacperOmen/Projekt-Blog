import HomePage from "./pages/HomePage"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <>
      <main className="w-[80%] mx-auto">
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App