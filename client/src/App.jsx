import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
 import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { EmpAll } from './Components/EmpAll.jsx';
import { EmpDetails } from './Components/EmpDetails';

function App() {

  
  return (
    <>
   
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<EmpAll></EmpAll>} />

      <Route path="/employee" element={<EmpAll></EmpAll>} />
      <Route path="/employee/:id" element={<EmpDetails></EmpDetails>} />
    

    </Routes>
  </BrowserRouter>,

   
    </>
  )
}

export default App
