import { useEffect, useRef, useState } from "react";

const ABOUT_TEXT = `Hey, I'm Jonathan Avi Biswas, a passionate web developer with a strong foundation in both front-end and back-end technologies. My journey into web development started with curiosity — I wanted to understand how the websites I used every day actually worked, and that curiosity grew into a genuine love for building things from scratch.

I have a keen eye for design and a deep commitment to creating seamless, user-friendly experiences. I enjoy the balance between crafting clean, responsive interfaces and writing solid, efficient code that powers them behind the scenes — whether it's structuring layouts with HTML and CSS, adding interactivity with JavaScript, or building functionality with React and Node.js.

I'm always learning new tools and staying curious about the latest trends, pushing myself to grow with every project.

I'm currently looking for opportunities to contribute as a web developer, collaborate with a team, and keep building innovative solutions that make a difference.`;

const CERTIFICATIONS = [
  "Full Stack Web Development — Programming Hero (2026)",
  "Certification (2026)",
  "Certification (2026)",
];

function CertItem({ text }) {
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="cert-item" ref={itemRef} onMouseMove={handleMouseMove}>
      <span className="cert-icon">🏆</span>
      <p>{text}</p>
    </div>
  );
}

export default function About() {
  const [typedText, setTypedText] = useState("");
  const textRef = useRef(null);
  const hasTyped = useRef(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTyped.current) {
            hasTyped.current = true;

            let i = 0;
            const speed = 12;
            const interval = setInterval(() => {
              i++;
              setTypedText(ABOUT_TEXT.slice(0, i));
              if (i >= ABOUT_TEXT.length) clearInterval(interval);
            }, speed);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about">
      <h2 className="about-title">
        About <span>Me</span>
      </h2>

      <div className="about-grid">

        <div className="about-box about-text-box">
          <p id="about-text" ref={textRef}>
            {typedText}
          </p>
        </div>

        <div className="about-box">
          <h3>Skills</h3>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>React, Node.js</li>
            <li>Python</li>
            <li>Graphics Design</li>
            <li>Photography</li>
          </ul>

          <h3 style={{ marginTop: "20px" }}>Language</h3>
          <ul>
            <li>English</li>
            <li>Bengali</li>
            <li>Hindi</li>
          </ul>

          <div className="cert-section">
            <h3>Certifications & Achievements</h3>
            <div className="cert-grid">
              {CERTIFICATIONS.map((text, i) => (
                <CertItem key={i} text={text} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
