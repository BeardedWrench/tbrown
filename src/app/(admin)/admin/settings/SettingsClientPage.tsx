'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SettingType } from '@prisma/client';

interface Setting {
  id: string;
  key: string;
  value: string;
  type: SettingType;
}

export default function SettingsClientPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState<SettingType>('BOOLEAN');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleUpdate = async (
    id: string,
    key: string,
    value: string,
    type: string
  ) => {
    await fetch(`/api/admin/settings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ key, value, type }),
    });

    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, key, value } : s))
    );
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/settings/${id}`, { method: 'DELETE' });
    setSettings((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAdd = async () => {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({ key: newKey, value: newValue, type: newType }),
    });
    const data = await res.json();
    setSettings((prev) => [...prev, data]);
    setNewKey('');
    setNewValue('');
    setNewType('BOOLEAN');
  };

  const renderValueInput = (setting: Setting) => {
    switch (setting.type) {
      case 'BOOLEAN':
        return (
          <Switch
            checked={setting.value === 'true'}
            onCheckedChange={(val) =>
              handleUpdate(
                setting.id,
                setting.key,
                val.toString(),
                setting.type
              )
            }
          />
        );
      case 'NUMBER':
      case 'STRING':
      case 'JSON':
      default:
        return (
          <Input
            type={setting.type === 'NUMBER' ? 'number' : 'text'}
            defaultValue={setting.value}
            onBlur={(e) =>
              handleUpdate(
                setting.id,
                setting.key,
                e.target.value,
                setting.type
              )
            }
          />
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Site Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-10 bg-muted rounded-md"
                />
              ))}
            </div>
          ) : settings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No settings found.</p>
          ) : (
            settings.map((setting) => (
              <div
                key={setting.id}
                className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b pb-4"
              >
                <div>
                  <Label className="text-sm font-semibold">{setting.key}</Label>
                  <p className="text-xs text-muted-foreground">
                    Type: {setting.type}
                  </p>
                </div>
                <div>{renderValueInput(setting)}</div>
                <div className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(setting.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add New Setting</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              placeholder="canLogin"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              placeholder="true"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              className="w-full border p-2 rounded-md"
              value={newType}
              onChange={(e) => setNewType(e.target.value as SettingType)}
            >
              <option value="STRING">String</option>
              <option value="BOOLEAN">Boolean</option>
              <option value="NUMBER">Number</option>
              <option value="JSON">JSON</option>
            </select>
          </div>
          <div className="md:col-span-3 text-right">
            <Button onClick={handleAdd}>Add Setting</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
