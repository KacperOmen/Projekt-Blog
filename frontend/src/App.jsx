import HomePage from "./pages/HomePage"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Layout from "./layout/Layout"

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>           
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App