import { useEffect, useRef } from "react";
import { projects } from "../data/projects.js";

const CARD_WIDTH = 260 + 25; // card width + gap

export default function Projects({ onSelectProject }) {
  const trackRef = useRef(null);
  const autoScrollEnabled = useRef(true);
  const pauseTimeout = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId;
    const scrollSpeed = 0.5; // pixels per frame

    function step() {
      if (autoScrollEnabled.current) {
        track.scrollLeft += scrollSpeed;

        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
          track.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    const pause = () => { autoScrollEnabled.current = false; };
    const resume = () => { autoScrollEnabled.current = true; };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      clearTimeout(pauseTimeout.current);
    };
  }, []);

  const pauseAutoScrollBriefly = () => {
    autoScrollEnabled.current = false;
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      autoScrollEnabled.current = true;
    }, 2000);
  };

  const scrollByCard = (direction) => {
    trackRef.current?.scrollBy({ left: direction * CARD_WIDTH, behavior: "smooth" });
    pauseAutoScrollBriefly();
  };

  return (
    <section className="projects" id="projects">
      <h2 className="projects-title">Projects</h2>

      <div className="projects-wrapper">
        <button className="projects-arrow prev" onClick={() => scrollByCard(-1)}>
          &#10094;
        </button>

        <div className="projects-track" ref={trackRef}>
          {projects.map((project) => (
            <div
              className="project-card"
              key={project.id}
              onClick={() => onSelectProject(project)}
            >
              <img src={project.img} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.shortDesc}</p>
            </div>
          ))}
        </div>

        <button className="projects-arrow next" onClick={() => scrollByCard(1)}>
          &#10095;
        </button>
      </div>
    </section>
  );
}
