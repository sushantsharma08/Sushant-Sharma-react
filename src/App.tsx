// import { useState } from 'react';
import Navbar from "./components/Navbar.tsx";
import './App.css'
import About from './Sections/About.tsx';
import Education from './Sections/Education.tsx';
import Projects from './Sections/Projects.tsx';
import Skill from './Sections/Skill.tsx';
import Contact from './Sections/Contact.tsx';
import Hero from './components/Hero.tsx';
import Typewriter from 'typewriter-effect';
import { Box } from "@mui/material";
import Footer from "./components/Footer.tsx";


function App() {
  // const [theme, useTheme] = useState("dark")
  let theme = "dark"
  return (
    // <ThemeProvider theme={theme}>


      <Box className={`${theme} main`} >
        <Box className="navi">
          <Navbar />

        </Box>

        <Box className="header">

          <Box className="Hero">
            <Hero Action={"Typing"} />
          </Box>
          <Box className="intro">
            <h1 style={{ lineHeight: "40px", color: "rgb(98, 92, 92)" }}>Hello I am</h1>
            <h1 style={{ lineHeight: "40px", color: "burlywood" }}>
              <Typewriter
                options={{
                  strings: ['Sushant Sharma', 'an Engineer', 'A Developer'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
          </Box>
          
        </Box>

        <About />
        <Education />
        <Skill />
        <Projects />
        {/* <Contact /> */}
        <Footer/>
      </Box>
    // </ThemeProvider>
  )
}

export default App
