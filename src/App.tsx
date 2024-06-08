
import './App.css'
import Routes from './Routes/ReactRoutes'
import { AuthProvider } from './Context/AuthContext'

function App() {


  return (
      <><AuthProvider><Routes/></AuthProvider></>
      
      
  )
}

export default App
