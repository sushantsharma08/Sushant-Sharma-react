import { useState } from 'react';
import Navbar from "./components/Navbar.tsx";
import './App.css'
import About from './Sections/About.tsx';
import Education from './Sections/Education.tsx';
import Projects from './Sections/Projects.tsx';
import Skill from './Sections/Skill.tsx';
import Contact from './Sections/Contact.tsx';
import Hero from './components/Hero.tsx';

function App() {
  const [theme, useTheme] = useState("dark")
  return (
    <div className={`${theme} main`} >
<div className="header">
<Navbar />

<div className="Hero">
        <div className="my_avatar" >
          <Hero />
        </div>
        <div className='text'>
          <h1>Hello I am Sushant Sharma</h1>
        </div>

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
