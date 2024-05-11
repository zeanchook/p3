import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App.jsx'
// import './index.css'

localStorage.debug = "mern:*";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
