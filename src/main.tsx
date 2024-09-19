import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/Home/NavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <NavBar />
      <div className='flex flex-col my-16 font-sans'>
      <App />
      </div>
    </Router>
  </StrictMode>,
)
