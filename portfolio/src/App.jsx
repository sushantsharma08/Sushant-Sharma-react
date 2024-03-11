import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Education from './Pages/Education';
import Skills from './Pages/Skills';
import Projects from './Pages/Projects';


function App() {

  return (
    <div style={{ border: "2px solid red" }}>

      <Router>

        <Header />

        <div style={{ border: "2px solid red" }}>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/Education' element={<Education />} />
            <Route path='/Skills' element={<Skills />} />
            <Route path='/projects' element={<Projects />} />
          </Routes>
        </div>

        <Footer />

      </Router>
    </div>

  )
}

export default App
