import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header/Header';
import Homepage from './Pages/Homepage/Homepage';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Header />
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App