import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header/Header';
import SignUpPage from './Pages/Homepage/SignUpPage/SignUpPage';
import Homepage from './Pages/Homepage/Homepage';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div>
       <BrowserRouter>
       <Header />
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/SignUp' element={<SignUpPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App