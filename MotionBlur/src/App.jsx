import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header/Header';
import Homepage from './Pages/Homepage/Homepage';
import './App.css';

function App() {
  return (
    <div>
      <Header />
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App