import { getAllTutorials } from '@/lib/tutorials/data';
import TutorialsClientPage from './TutorialsClientPage';

export default async function AdminTutorialsClientPage() {
  const tutorials = await getAllTutorials();
  return <TutorialsClientPage tutorials={tutorials} />;
}
