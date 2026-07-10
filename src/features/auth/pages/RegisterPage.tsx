import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { useAppDispatch } from '../../../states/hooks';
import type { RegisterUser } from '../../../types/user.types';
import { asyncRegisterUser } from '../../../states/user/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onRegister = async ({ name, email, password }: RegisterUser) => {
    setError('');
    setSuccess('');
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      setSuccess('Registrasi berhasil! Mengalihkan ke halaman login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registrasi gagal, coba gunakan email lain.';
      setError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Daftar Akun Baru
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            <span>Sudah punya akun? </span>
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
            {success}
          </div>
        )}

        <RegisterInput register={onRegister} />
      </div>
    </div>
  );
}

export default RegisterPage;
