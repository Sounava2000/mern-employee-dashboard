import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
  import { ToastContainer, toast } from 'react-toastify';
 import 'bootstrap/dist/css/bootstrap.min.css';

import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
            <ToastContainer />

  </StrictMode>,
)
