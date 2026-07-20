import React from 'react';
import useInput from '../../../hooks/useInput';

interface CommentInputProps {
  addComment: (text: string) => void;
}

export default function CommentInput({ addComment }: CommentInputProps) {
  const [text, handleTextChange, setText] = useInput('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addComment(text);
      setText('');
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Beri Komentar</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Tulis komentar Anda di sini..."
            rows={4}
            className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            Kirim Komentar
          </button>
        </div>
      </form>
    </div>
  );
}
