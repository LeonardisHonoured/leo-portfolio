import { profile } from '../data.js'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="container hero-inner">
        <div className="hero-text reveal">
          <p className="eyebrow">Portfolio</p>
          <h1>
            {profile.name}
            <span className="gradient-text">.</span>
          </h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-bio">{profile.bio}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="hero-photo reveal">
          <div className="photo-ring">
            <img src={profile.photo} alt={profile.name} />
          </div>
        </div>
      </div>
    </section>
  )
}
