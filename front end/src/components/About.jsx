import { profile, about, skills } from '../data.js'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title reveal">About Me</h2>

        <div className="about-grid">
          <div className="about-card reveal">
            <img className="about-photo" src={profile.photo} alt={profile.name} />
            <div>
              <h3>{profile.name}</h3>
              <p className="muted">{profile.headline}</p>
              <p>{about.bio}</p>
              <p>{about.approach}</p>
              <p className="muted">
                Here is my educational history, from where I began to where I am
                right now.
              </p>
              {about.education.map((item) => (
                <p key={item.title}>
                  <strong>
                    {item.period} &middot; {item.title}
                  </strong>
                  <br />
                  {item.detail}
                </p>
              ))}
              <div className="socials">
                <a href={`mailto:${profile.email}`}>Email</a>
                <a href={profile.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <a href={`tel:${profile.phone}`}>Mobile</a>
              </div>
            </div>
          </div>

          <div className="skills reveal" id="knowledge">
            <h3>Area of Knowledge</h3>
            <ul className="skill-chips">
              {skills.map((skill) => (
                <li key={skill.name} title={skill.hint}>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
