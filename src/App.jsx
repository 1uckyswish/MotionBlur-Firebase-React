import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header/Header';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import Homepage from './Pages/Homepage/Homepage';
import TimeLine from './Pages/TimeLine/TimeLine';
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
          <Route path='/TimeLine' element={<TimeLine />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App