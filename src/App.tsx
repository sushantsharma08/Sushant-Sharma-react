import { useState } from 'react';
import Navbar from "./components/Navbar.tsx";
import './App.css'
import About from './Sections/About.tsx';
import Education from './Sections/Education.tsx';
import Projects from './Sections/Projects.tsx';
import Skill from './Sections/Skill.tsx';
import Contact from './Sections/Contact.tsx';
import Hero from './components/Hero.tsx';
import Typewriter from 'typewriter-effect';

function App() {
  const [theme, useTheme] = useState("dark")
  return (
    <div className={`${theme} main`} >
      <div className="navi">
        <Navbar />

      </div>

      <div className="header">

        <div className="Hero">
            <Hero />
        </div>
        <div className="intro">
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
          </div>
      </div>


      <About />
      <Projects />
      <Education />
      <Skill />
      <Contact />

    </div>
  )
}

export default App
