// app/(admin)/admin/users/UsersClient.tsx
'use client';

import { DBUser } from '@/types/user';
import { Role } from '@prisma/client';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Props {
  users: DBUser[];
  roles: Role[];
}

export default function UsersClient({ users, roles }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(() => {
      void (async () => {
        const res = await fetch(`/api/admin/users/${id}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          toast.error('Failed to delete user');
          return;
        }

        toast.success('User deleted');
        window.location.reload();
      })();
    });
  };

  const handleRoleChange = (id: string, roleId: string) => {
    startTransition(() => {
      void (async () => {
        const res = await fetch(`/api/admin/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ roleId }),
        });

        if (!res.ok) {
          toast.error('Failed to update role');
          return;
        }

        toast.success('Role updated');
      })();
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-300">
            <th className="px-2 py-2 text-left">Name</th>
            <th className="px-2 py-2 text-left">Email</th>
            <th className="px-2 py-2 text-left">Role</th>
            <th className="px-2 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-neutral-200">
              <td className="px-2 py-2">{u.name ?? '—'}</td>
              <td className="px-2 py-2">{u.email}</td>
              <td className="px-2 py-2">
                <select
                  className="border rounded p-1"
                  defaultValue={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-2 py-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(u.id)}
                  disabled={isPending}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
