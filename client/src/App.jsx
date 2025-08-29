import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from '../src/client/components/Navbar';
import Home from "../src/client/pages/Home"
import News from "../src/client/components/news/News"
import Sports from "../src/client/pages/Sports"
import Education from "../src/client/pages/Education"
import Culture from "../src/client/pages/Culture"
import Arts from "../src/client/pages/Arts"
import Travel from "../src/client/pages/Travel"
import Contact from "../src/client/pages/Contact"
import Footer from '../src/client/components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';  //npm install @fortawesome/fontawesome-free
import NewsDetail from '../src/client/components/news/NewsDetail';
import Register from '../src/client/components/auth/Register';
import Login from '../src/client/components/auth/Login';
import Profile from '../src/client/components/Profile';
import { ToastContainer } from 'react-toastify'; //npm install react-toastify
import 'react-toastify/dist/ReactToastify.css';
import NewsForm from '../src/client/components/news/NewsForm';
import { UserProvider } from './client/components/UserContext';
import ScrollToHashElement from '../src/client/components/scrollToHashElement';
import { Slide } from 'react-toastify';
import PageWrapper from '../src/client/components/PageWrapper';

export default function App() {
  return (
    
    <UserProvider>
    <Router>
      <PageWrapper>
    <ScrollToHashElement/>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path="/news/edit/:id" element={<NewsForm />} />
        <Route path='/news/:id/' element={<NewsDetail/>}/>
        <Route path='/sports' element={<Sports/>} />
        <Route path='/education' element={<Education/>} />
        <Route path='/culture' element={<Culture/>} />
        <Route path='/arts' element={<Arts/>} />
        <Route path='/travel' element={<Travel/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>} />

      </Routes>
      <Footer/>
      </PageWrapper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
          toastStyle={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '12px',
              padding: '16px 20px',
          }}
          progressStyle={{
              background: 'rgba(0, 0, 0, 0.1)',
              height: '3px'
          }}
    />
    </Router>
    </UserProvider>
  )
}
