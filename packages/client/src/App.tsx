import { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
