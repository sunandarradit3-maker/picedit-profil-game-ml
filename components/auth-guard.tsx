'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, seedUsers } from '@/lib/auth';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    seedUsers();
    const user = getCurrentUser();
    setAuthenticated(Boolean(user));
    setReady(true);
  }, []);

  useEffect(() => {
    const onStorage = () => setAuthenticated(Boolean(getCurrentUser()));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!ready) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="flex items-center gap-2 text-slate-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          Verifying session…
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white">
        <p className="text-2xl font-semibold">Login required</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">Masuk untuk mengakses dashboard, editor, profil, settings, dan panel admin.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Login</Link>
          <Link href="/register" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">Register</Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
