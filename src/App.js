
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './components/landingPage/LandingPage';
import Footer from './components/Footer/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectsCategories from './pages/ProjectsCategories';
import Projects from './pages/Projects';
import Project from './pages/Project';
import { Canvas } from "@react-three/fiber"
import { Lightformer, Environment, OrbitControls, Stats } from "@react-three/drei"
import Experience from './components/WebGl/Experience';

function App() {
  let canShow = false;

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
        <Canvas
          eventSource={document.getElementById("root")}
          eventPrefix="client"
          shadows
          camera={{ position: [0, 0, 20], fov: 50 }}

        >
          <Environment preset="city">
            <Lightformer
              intensity={8}
              position={[10, 5, 0]}
              scale={[10, 50, 1]}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
            <ambientLight />
            <OrbitControls />
            <Stats />
          </Environment>
          <Experience />
        </Canvas>

      </BrowserRouter>

    </div>
  );
}



export default App;
