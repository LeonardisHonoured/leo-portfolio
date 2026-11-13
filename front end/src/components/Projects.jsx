import { projects } from '../data.js'

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <h2 className="section-title reveal">Body of Work</h2>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.id}>
              <div className="card-letter">{project.title.charAt(0)}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="chip">{project.technologies}</span>
              {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer">
                  Visit project →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
