
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './components/landingPage/LandingPage';
import Footer from './components/Footer/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectsCategories from './pages/ProjectsCategories';
import Projects from './pages/Projects';
import Project from './pages/Project';
import MobileNav from './components/Nav/MobileNav';
import Experience from './components/WebGl/Experience';
import Loading from './components/landingPage/Loading';

function App() {
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;


  return (
    <div className="App">

      <BrowserRouter>

     {  isMobile? <MobileNav /> : <Footer />}

        <Routes>
          <Route path="/" element={<LandingPage showElements={true} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/:catId" element={<Projects />} />
          <Route path="/project/:index/:catId?" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Experience />
        <Loading />
      </BrowserRouter>
   

    </div>
  );
}



export default App;
