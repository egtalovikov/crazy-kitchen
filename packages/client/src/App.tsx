import { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { store } from './store'
import { fetchUserData } from './store/modules/auth/auth.reducer'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  useEffect(() => {
    store.dispatch(fetchUserData())
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
