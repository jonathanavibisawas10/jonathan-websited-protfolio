export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>
          <span>jonathan</span>_avibis
        </h1>
      </div>

      <nav className="nav-bar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="availability">
        <span className="status-dot"></span>
        Available Now
      </div>
    </header>
  );
}
