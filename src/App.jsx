import { useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Header />
      <Home />
      <About />
      <Projects onSelectProject={setSelectedProject} />
      <Contact />
      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
