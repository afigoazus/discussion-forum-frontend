import type { RegisterUser } from '../../../types/user.types';
import useInput from '../../../hooks/useInput';

interface RegisterInputProps {
  register: (user: RegisterUser) => void;
  isLoading?: boolean;
}

export default function RegisterInput({ register, isLoading = false }: RegisterInputProps) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4 rounded-md">
        <div>
          <label
            htmlFor="name"
            className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <span>Nama Lengkap</span>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isLoading}
              value={name}
              onChange={onNameChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm disabled:opacity-50"
              placeholder="Nama Anda"
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="email-address"
            className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <span>Email</span>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={onEmailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm disabled:opacity-50"
              placeholder="nama@email.com"
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <span>Password</span>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={onPasswordChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm disabled:opacity-50"
              placeholder="••••••••"
            />
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Mendaftarkan...
            </span>
          ) : (
            'Register'
          )}
        </button>
      </div>
    </form>
  );
}
