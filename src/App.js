import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './components/landingPage/LandingPage';
import Footer from './components/Footer/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectsCategories from './pages/ProjectsCategories';
import Projects from './pages/Projects';
import Project from './pages/Project';
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Footer />
        <Routes>
          <Route path="/" element={<LandingPage showElements={true} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projectsCategories" element={<ProjectsCategories />} />
          <Route path="/projects/:id" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
