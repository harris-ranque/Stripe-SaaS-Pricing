'use client';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/hooks/use-logout';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout, loading } = useLogout();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col border-r p-4">
        <p className="mb-6 text-sm font-semibold text-zinc-900">Dashboard</p>
        <div className="mt-auto">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => void logout()}
            disabled={loading}
          >
            {loading ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
