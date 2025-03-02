import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './utils.css'

import LandingPage from './pages/landing/LandingPage'
import AuthPage from './pages/auth/AuthPage'
import Login from './components/Login'
import Register from './components/Register'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path='/' element={<LandingPage />}/>
        <Route path='/auth' element={<AuthPage />} >
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Route>
        {/* PRIVATE ROUTE */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
