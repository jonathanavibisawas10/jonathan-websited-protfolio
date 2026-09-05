import { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={project.img} alt={project.title} />
        <h3>{project.title}</h3>
        <p>{project.longDesc}</p>
        <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
      </div>
    </div>
  );
}
