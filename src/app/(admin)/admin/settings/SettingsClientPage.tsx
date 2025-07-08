'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SettingType } from '@prisma/client';
import JsonEditor from '@/components/editors/JsonEditor';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
const mdParser = new MarkdownIt({
  html: true,
});
import 'react-markdown-editor-lite/lib/index.css';

interface Setting {
  id: string;
  key: string;
  value: string;
  type: SettingType;
}

export default function SettingsClientPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [editMap, setEditMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState<string | boolean>('');
  const [newType, setNewType] = useState<SettingType>('BOOLEAN');

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
    if (type === 'JSON') {
      try {
        JSON.parse(value);
      } catch {
        alert('Invalid JSON');
        return;
      }
    }

    await fetch(`/api/admin/settings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ key, value, type }),
    });

    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, key, value } : s))
    );
    setEditMap((prev) => ({ ...prev, [id]: false }));
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/settings/${id}`, { method: 'DELETE' });
    setSettings((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAdd = async () => {
    const value = newType === 'BOOLEAN' ? Boolean(newValue) : newValue;
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({ key: newKey, value, type: newType }),
    });
    const data = await res.json();
    setSettings((prev) => [...prev, data]);
    setNewKey('');
    setNewValue('');
    setNewType('BOOLEAN');
  };

  const renderNewValueInput = () => {
    switch (newType) {
      case 'BOOLEAN':
        return (
          <div>
            <Label htmlFor="value">Value</Label>
            <Switch
              checked={newValue === true}
              onCheckedChange={(val) => setNewValue(val)}
            />
          </div>
        );
      case 'JSON':
        return (
          <div className="col-span-full">
            <Label htmlFor="value">Value</Label>
            <JsonEditor
              value={typeof newValue === 'string' ? newValue : '{}'}
              onChange={(val) => setNewValue(val)}
            />
          </div>
        );
      case 'STRING':
        return (
          <div className="col-span-full">
            <Label htmlFor="value">Value</Label>
            <MdEditor
              value={typeof newValue === 'string' ? newValue : ''}
              style={{ height: '400px', width: '1200px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={({ text }) => setNewValue(text)}
            />
          </div>
        );
      case 'NUMBER':
        return (
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              type="number"
              value={newValue as string}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderValueInput = (setting: Setting) => {
    const isEditing = editMap[setting.id];

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
      case 'JSON':
        return isEditing ? (
          <JsonEditor
            value={setting.value}
            onChange={(val) =>
              setSettings((prev) =>
                prev.map((s) =>
                  s.id === setting.id ? { ...s, value: val } : s
                )
              )
            }
          />
        ) : (
          <pre className="text-xs bg-neutral-100 dark:bg-neutral-800 rounded p-2 overflow-x-auto">
            {setting.value}
          </pre>
        );
      case 'STRING':
        return isEditing ? (
          setting.value.length > 60 ? (
            <MdEditor
              value={setting.value}
              style={{ height: '400px', width: '800px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={({ text }) =>
                setSettings((prev) =>
                  prev.map((s) =>
                    s.id === setting.id ? { ...s, value: text } : s
                  )
                )
              }
            />
          ) : (
            <Input
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
          )
        ) : (
          <span className="text-sm text-muted-foreground">{setting.value}</span>
        );
      case 'NUMBER':
        return isEditing ? (
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
        ) : (
          <span>{setting.value}</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-fit max-w-full overflow-x-auto mx-auto p-6 space-y-8">
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
                className="grid grid-cols-1 md:grid-cols-4 items-center border-b pb-4"
              >
                <div>
                  <Label className="text-sm font-semibold">{setting.key}</Label>
                  <p className="text-xs text-muted-foreground">
                    Type: {setting.type}
                  </p>
                </div>
                <div className="md:col-span-2">{renderValueInput(setting)}</div>
                <div className="flex justify-end space-x-2">
                  {setting.type !== 'BOOLEAN' &&
                    (!editMap[setting.id] ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setEditMap((prev) => ({
                            ...prev,
                            [setting.id]: true,
                          }))
                        }
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() =>
                          handleUpdate(
                            setting.id,
                            setting.key,
                            setting.value,
                            setting.type
                          )
                        }
                      >
                        Save
                      </Button>
                    ))}

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
          {renderNewValueInput()}
          <div className="md:col-span-3 text-right">
            <Button onClick={handleAdd}>Add Setting</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
