import React from 'react';
import { Bold, Italic, List, Link, Image } from 'lucide-react';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  initialValue
}: RichTextEditorProps) {
  const [content, setContent] = React.useState(initialValue || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onChange?.(e.target.value);
  };

  const insertFormat = (format: string) => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    
    let newText = '';
    switch (format) {
      case 'bold':
        newText = `${before}**${selection}**${after}`;
        break;
      case 'italic':
        newText = `${before}_${selection}_${after}`;
        break;
      case 'list':
        newText = `${before}\n- ${selection}${after}`;
        break;
      case 'link':
        newText = `${before}[${selection}](url)${after}`;
        break;
      case 'image':
        newText = `${before}![${selection}](url)${after}`;
        break;
    }
    
    setContent(newText);
    onChange?.(newText);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b px-3 py-2 flex space-x-2">
        <button
          type="button"
          onClick={() => insertFormat('bold')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormat('italic')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormat('list')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormat('link')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Link className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormat('image')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Image className="h-4 w-4" />
        </button>
      </div>
      
      <textarea
        id="editor"
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-4 min-h-[200px] focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />
    </div>
  );
}