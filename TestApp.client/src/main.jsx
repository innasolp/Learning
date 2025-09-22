import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { helloTestJsLib } from 'test_js_lib/scripts'
import { helloTestCssLib } from 'test_css_lib/hello'
import 'test_css_lib/styles.css'
import App from './App.jsx'

console.log(helloTestJsLib())

helloTestCssLib()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
