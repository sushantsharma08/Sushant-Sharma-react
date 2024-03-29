import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Education from './Pages/Education';
import Skills from './Pages/Skills';
import Projects from './Pages/Projects';


function App() {

  return (
    <>
      <Router>
        <div><Navbar /></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Education' element={<Education />} />
          <Route path='/Skills' element={<Skills />} />
          <Route path='/projects' element={<Projects />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
