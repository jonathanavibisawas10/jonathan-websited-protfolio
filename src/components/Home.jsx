export default function Home() {
  return (
    <section className="home" id="home">
      <div className="home-card">

        <div className="home-info">
          <p>Hello, I'm</p>

          <h1>Jonathan Avi Biswas</h1>

          <h3><span>Web</span> Developer</h3>

          <p>
            i am finding a job as a web developer. I have experience in{" "}
            <span>HTML, CSS, JavaScript, React, Node.js, and other web development technologies</span>.
            I am passionate about creating beautiful and functional websites that provide a great user experience.
          </p>

          <a href="#projects">
            <button>View My Projects</button>
          </a>
        </div>

        <div className="photo-area">
          <img src="/images/profile.jpeg" alt="Jonathan" />
        </div>

      </div>
    </section>
  );
}
