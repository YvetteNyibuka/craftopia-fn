import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/Home/NavBar.tsx'
import Footer from './components/Home/Footer.tsx'
import AboutUsPage from './components/Home/AboutUsPage.tsx'
import ContactPage from './components/Home/ContactPage.tsx'
import CraftPage from './components/Home/CraftPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <NavBar />
      <div className='flex flex-col my-16 font-sans'>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/shop" element={<CraftPage />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  </StrictMode>,
)
