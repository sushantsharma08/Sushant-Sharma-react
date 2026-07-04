// import { useState } from 'react';
import Navbar from "./components/Navbar.tsx";
import './App.css'
import About from './Sections/About.tsx';
import Education from './Sections/Education.tsx';
import Skill from './Sections/Skill.tsx';
import Typewriter from 'typewriter-effect';
import { Box } from "@mui/material";
import Footer from "./components/Footer.tsx";
import Experience from "./Sections/Experience.tsx";
import Projects from "./Sections/Projects.tsx";
import Contact from "./Sections/Contact.tsx";
import DnaHelix from "./components/DnaHelix.tsx";

function App() {
  return (

    <Box className={`main`} >
      <DnaHelix />

      <Navbar />

      <Box className="header">
        <Box className="intro">
          <h1 style={{ lineHeight: "1.3", color: "rgb(98, 92, 92)" }}>Hello I am</h1>
          <h1 style={{ lineHeight: "1.3", color: "burlywood" }}>
            <Typewriter
              options={{
                strings: ["Sushant Sharma", "an Engineer", "A Developer"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </Box>
      </Box>

      <Box className="sections_stack">
        <Experience />
        <About />
        <Skill />
        <Projects />
        <Education />
        <Contact />
      </Box>

      <Footer />
    </Box>
  )
}

export default App
