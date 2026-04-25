import { featuredProjectItems } from '../lib/site-profile';

import { ProjectCardConcept } from './ProjectCardConcept';
import { SectionTitle } from './SectionTitle';

export function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <SectionTitle icon="projects" title="Projects and Tools" />
      <div className="projects-section__carousel" aria-label="Projects and tools">
        {featuredProjectItems.map((project) => (
          <ProjectCardConcept key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
