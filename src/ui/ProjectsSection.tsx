import { featuredProjectItems } from '../lib/site-profile';

import { Icon } from './Icon';
import { ProjectCardConcept } from './ProjectCardConcept';
import { SectionTitle } from './SectionTitle';

export function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-section__heading">
        <SectionTitle icon="projects" title="Projects and Tools" />
        <a className="projects-section__heading-link" href="/projects-and-tools/">
          <span>View all projects</span>
          <Icon name="arrow-right" className="projects-section__heading-link-icon" />
        </a>
      </div>
      <div className="projects-section__carousel" aria-label="Projects and tools">
        {featuredProjectItems.map((project) => (
          <ProjectCardConcept key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
