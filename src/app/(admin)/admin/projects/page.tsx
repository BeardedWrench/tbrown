import { getProjects } from '@/lib/projects/data';
import ProjectsClient from './ProjectsClient';

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
