'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Card, Button, Input } from '@/components/ui';
import { loginUser, seedUsers } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@posterflow.app');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  useEffect(() => {
    seedUsers();
  }, []);

  const submit = () => {
    try {
      loginUser(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto grid max-w-7xl place-items-center px-4 py-14 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Login</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Use the seeded admin account or your own registered browser account.
          </p>
          <div className="mt-6 space-y-4">
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <Button onClick={submit} className="w-full">Login</Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            No account yet? <Link href="/register" className="text-cyan-300">Register</Link>
          </p>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
