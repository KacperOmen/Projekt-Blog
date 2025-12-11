import {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const AUTH_API_URL = import.meta.env.VITE_API_URL + "api/auth"
  const ARTICLE_API_URL = import.meta.env.VITE_API_URL + "api/article"
  const COMMENT_API_URL = import.meta.env.VITE_API_URL + "api/comment"
  const [user, setUser] = useState({})

   useEffect(() => {
        axios
            .get(`${AUTH_API_URL}/me`, { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
    }, []);

  const value = {
    AUTH_API_URL, ARTICLE_API_URL, COMMENT_API_URL,
    user, setUser
  }

  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
