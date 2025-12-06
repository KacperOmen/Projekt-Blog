import {createContext} from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const AUTH_API_URL = "http://localhost:3000/api/auth"

  const value = {
    AUTH_API_URL
  }

  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
