/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SettingType } from '@prisma/client';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getAllSettings } from '@/lib/settings/data';

interface Setting {
  id: string;
  key: string;
  value: string;
}

const mock1 = {
  id: '123',
  key: 'onTest',
  value: 'true',
  type: 'BOOLEAN',
};
const mock2 = {
  id: '1234',
  key: 'canAccess',
  value: 'false',
  type: 'BOOLEAN',
};
const mock3 = {
  id: '12345',
  key: 'canLogin',
  value: 'true',
  type: 'BOOLEAN',
};
const mock4 = {
  id: '1234577',
  key: 'whoAdmin',
  value: 'bob',
  type: 'STRING',
};
const mock5 = {
  id: '123457733',
  key: 'loginAttemptsAllowed',
  value: '6',
  type: 'NUMBER',
};
const mock6 = {
  id: '123457733222',
  key: 'defaultConfig',
  value: '{"key": "value"}',
  type: 'JSON',
};
const mockSettings: Setting[] = [mock1, mock2, mock3, mock4, mock5, mock6];

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
}

export default function SettingsClientPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState<SettingType>('BOOLEAN');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data));
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
    setSettings((prev) => [...prev, data.setting]);
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
        return (
          <Input
            type="number"
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
      case 'JSON':
        return (
          <Input
            type="text"
            defaultValue={setting.value}
            placeholder='{"key":"value"}'
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
      case 'STRING':
      default:
        return (
          <Input
            type="text"
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
          {settings.map((setting) => (
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
          ))}
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
