'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useNotificationStore } from '@/features/notifications/store/notification.store';
import { getErrorMessage } from '@/features/notifications/utils/get-error-message';

export default function LoginPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const notify = useNotificationStore((state) => state.notify);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await authApi.login(email, password);
      setAccessToken(data.access_token);
      router.push('/dashboard');
    } catch (error) {
      notify({
        type: 'error',
        message: getErrorMessage(error, 'Failed to login'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg border p-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <input
          className="w-full border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
