import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import Homepage from './Pages/Homepage/Homepage';
import TimeLine from './Pages/TimeLine/TimeLine';
import MusicPage from './Pages/MusicPage/MusicPage';
import Footer from './Components/Footer/Footer';
//Import css Files
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Route path='/MusicPage' element={<MusicPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App