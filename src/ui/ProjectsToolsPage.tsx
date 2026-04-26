import { projectsAndToolsPageItems } from '../lib/site-profile';

import { ProjectCardConcept } from './ProjectCardConcept';
import { SectionTitle } from './SectionTitle';

export function ProjectsToolsPage() {
  return (
    <div className="projects-tools-page">
      <header className="projects-tools-page__hero">
        <p className="projects-tools-page__eyebrow">Projects, tools, experiments</p>
        <h1 className="projects-tools-page__title">Projects and Tools</h1>
        <p className="projects-tools-page__copy">
          A working catalog of the products, tools, experiments, and archived side projects I have built or still maintain.
        </p>
      </header>

      <section className="projects-tools-page__section">
        <SectionTitle icon="projects" title="All Projects and Tools" />
        <div className="projects-tools-page__grid">
          {projectsAndToolsPageItems.map((project) => (
            <ProjectCardConcept key={project.title} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
}
