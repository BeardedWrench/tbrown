// app/(admin)/admin/users/page.tsx
import { getAllUsers } from '@/lib/auth/getUserFromRequest';
import UsersClient from './UsersClient';
import { getAllRoles } from '@/lib/auth/roles';

export default async function AdminUsersPage() {
  const users = await getAllUsers();
  const roles = await getAllRoles();

  return <UsersClient users={users} roles={roles} />;
}
