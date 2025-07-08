'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Undo,
  Redo,
  Pilcrow,
} from 'lucide-react';
import Paragraph from '@tiptap/extension-paragraph';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      Heading.configure({ levels: [1, 2] }),
      Link.configure({
        openOnClick: false,
      }),
      Paragraph,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  const iconBtn = (
    action: () => void,
    icon: React.ReactNode,
    active: boolean
  ) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={action}
      className={active ? 'bg-muted' : ''}
    >
      {icon}
    </Button>
  );

  return (
    <div className="space-y-2 border rounded-md bg-white dark:bg-neutral-900 p-2">
      <div className="flex flex-wrap gap-1 border-b pb-2">
        {iconBtn(
          () => editor.chain().focus().setParagraph(),
          <Pilcrow size={16} />,
          editor.isActive('bold')
        )}
        {iconBtn(
          () => editor.chain().focus().toggleBold().run(),
          <Bold size={16} />,
          editor.isActive('bold')
        )}
        {iconBtn(
          () => editor.chain().focus().toggleItalic().run(),
          <Italic size={16} />,
          editor.isActive('italic')
        )}
        {iconBtn(
          () => editor.chain().focus().toggleUnderline().run(),
          <UnderlineIcon size={16} />,
          editor.isActive('underline')
        )}
        {iconBtn(
          () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          <Heading1 size={16} />,
          editor.isActive('heading', { level: 1 })
        )}
        {iconBtn(
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          <Heading2 size={16} />,
          editor.isActive('heading', { level: 2 })
        )}
        {iconBtn(
          () => {
            const url = prompt('Enter URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          },
          <LinkIcon size={16} />,
          editor.isActive('link')
        )}
        {iconBtn(
          () => editor.chain().focus().undo().run(),
          <Undo size={16} />,
          false
        )}
        {iconBtn(
          () => editor.chain().focus().redo().run(),
          <Redo size={16} />,
          false
        )}
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-none dark:prose-invert min-h-[150px]"
      />
    </div>
  );
}
