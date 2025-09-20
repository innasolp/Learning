import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { helloNpm } from 'test_js_lib/scripts'
import App from './App.jsx'

console.log(helloNpm())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
