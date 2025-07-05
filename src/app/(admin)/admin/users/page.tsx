import { getAllUsers } from '@/lib/auth/getUserFromRequest';
import UsersClient from './UsersClient';

export default async function AdminUsersPage() {
  const users = await getAllUsers();
  return <UsersClient users={users} />;
}
