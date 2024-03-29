import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Home from '../Pages/Home';
import Education from '../Pages/Education';
import Skills from '../Pages/Skills';
import Projects from '../Pages/Projects';


const Navbar = () => {
  return (
    <div>
    <Router>
      <div>
        <Link to="/" >Home</Link>
        <Link to="/Education" >Education</Link>
        <Link to="/Skills" >Skills</Link>
        <Link to="/projects" >Projects</Link>
      </div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Education' element={<Education/>} />
          <Route path='/Skills' element={<Skills/>} />
          <Route path='/projects' element={<Projects/>} /> 
        </Routes>
      </Router>
    </div>
  )
}

export default Navbar