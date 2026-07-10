import type { RegisterUser } from '../../../types/user.types';
import useInput from '../../../hooks/useInput';

interface RegisterInputProps {
  register: (user: RegisterUser) => void;
}

export default function RegisterInput({ register }: RegisterInputProps) {
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
              name="name"
              type="text"
              required
              value={name}
              onChange={onNameChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
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
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={onEmailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
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
              name="password"
              type="password"
              required
              value={password}
              onChange={onPasswordChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="••••••••"
            />
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Register
        </button>
      </div>
    </form>
  );
}
