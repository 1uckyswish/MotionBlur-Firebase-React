import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import Components
import Header from './Components/Header/Header';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import Homepage from './Pages/Homepage/Homepage';
import Trending from './Pages/Trending/Trending';
import TimeLine from './Pages/TimeLine/TimeLine';
import MusicPage from './Pages/MusicPage/MusicPage';
import Footer from './Components/Footer/Footer';
import FirebaseDataProvider from './Context/FirebaseContext';
//Import css Files
import './App.css';

function App() {
  return (
    <div>
       <BrowserRouter>
       <FirebaseDataProvider>
       <Header />
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/SignUp' element={<SignUpPage />}/>
          <Route path='/Trending' element={<Trending />}/>
          <Route path='/TimeLine' element={<TimeLine />}/>
          <Route path='/MusicPage' element={<MusicPage />}/>
        </Routes>
        <Footer />
        </FirebaseDataProvider>
      </BrowserRouter>
    </div>
  )
}

export default App