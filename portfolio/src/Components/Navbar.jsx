import React from 'react';
import {Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div style={{border:"2px solid black"}}>
      <span >  <Link style={{textDecoration:"none", color:"inherit"}}  to="/" >Home</Link></span>
      <span >  <Link style={{textDecoration:"none", color:"inherit"}}  to="/Education" >Education</Link></span>
      <span >  <Link style={{textDecoration:"none", color:"inherit"}}  to="/Skills" >Skills</Link></span>
      <span >  <Link style={{textDecoration:"none", color:"inherit"}}  to="/projects" >Projects</Link></span>
    </div>
  )
}

export default Navbar