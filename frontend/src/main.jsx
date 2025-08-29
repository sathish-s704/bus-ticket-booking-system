import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n.js' // Import i18n configuration
import App from './App.jsx'
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 1000,
  once: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
