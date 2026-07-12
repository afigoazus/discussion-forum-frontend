import useInput from '../../../hooks/useInput';
import type { CreateThread } from '../../../types/thread.types';

interface ThreadInputProps {
  addThread: (thread: CreateThread) => void;
}

export default function ThreadInput({ addThread }: ThreadInputProps) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    
    addThread({
      title,
      body,
      category: category.trim() || 'general',
    });

    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Buat Diskusi Baru</h3>
      
      <div>
        <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Judul</span>
          <input
            type="text"
            required
            value={title}
            onChange={onTitleChange}
            placeholder="Judul diskusi..."
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </label>
      </div>

      <div>
        <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Kategori</span>
          <input
            type="text"
            value={category}
            onChange={onCategoryChange}
            placeholder="Kategori (contoh: react, javascript)..."
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </label>
      </div>

      <div>
        <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Isi Diskusi</span>
          <textarea
            required
            rows={4}
            value={body}
            onChange={onBodyChange}
            placeholder="Apa yang ingin Anda tanyakan atau bagikan?"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Kirim Diskusi
        </button>
      </div>
    </form>
  );
}
