export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <h3><span>jonathan</span>_avibis</h3>
          <p>Full Stack Web Developer building clean, functional, and user-friendly websites.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="https://github.com/jonathanavibisawas10" target="_blank" rel="noreferrer" aria-label="GitHub">G</a>
            <a href="https://www.instagram.com/jonathan.ab3011?igsi=eWtubm0wMXJmdHY0" target="_blank" rel="noreferrer" aria-label="Instagram">IN</a>
            <a href="https://www.facebook.com/share/1BbpLsCyD7/" target="_blank" rel="noreferrer" aria-label="Facebook">F</a>
            <a href="mailto:jonathan.avi30@hotmail.com" aria-label="Email">M</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Jonathan Avi Biswas. All rights reserved.</p>
        <button id="back-to-top" onClick={scrollToTop} aria-label="Back to top">↑</button>
      </div>
    </footer>
  );
}
