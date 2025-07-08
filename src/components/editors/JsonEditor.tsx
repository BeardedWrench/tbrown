/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import pluginEstree from 'prettier/plugins/estree';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function JsonEditor({ value, onChange }: Props) {
  const [local, setLocal] = useState(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocal(e.target.value);
    onChange(e.target.value);
  };

  const handleFormat = async () => {
    try {
      const formatted = await prettier.format(local, {
        parser: 'json',
        plugins: [parserBabel, pluginEstree],
        printWidth: 40,
        tabWidth: 2,
      });

      setLocal(formatted);
      onChange(formatted);
      setError(null);
    } catch (err) {
      console.error('Prettier format error:', err);
      setError('Invalid JSON');
    }
  };

  return (
    <div className="space-y-2">
      <CodeEditor
        value={local}
        language="json"
        placeholder="Enter valid JSON..."
        onChange={handleChange}
        padding={12}
        style={{
          fontSize: 14,
          backgroundColor: '#f9fafb',
          fontFamily: 'monospace',
          borderRadius: '0.5rem',
        }}
      />
      <div className="flex justify-between items-center">
        {error && <p className="text-sm text-red-500">{error}</p>}
        {local && (
          <button
            onClick={handleFormat}
            className="ml-auto text-sm text-blue-600 hover:underline"
          >
            Format JSON
          </button>
        )}
      </div>
    </div>
  );
}
