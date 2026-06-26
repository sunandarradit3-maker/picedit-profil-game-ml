'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Card, Button, Input } from '@/components/ui';
import { registerUser, seedUsers } from '@/lib/auth';
import type { Plan } from '@/lib/types';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', plan: 'free' as Plan });
  const [error, setError] = useState('');

  useEffect(() => {
    seedUsers();
  }, []);

  const submit = () => {
    try {
      registerUser(form);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto grid max-w-7xl place-items-center px-4 py-14 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Register</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Create your workspace</h1>
          <div className="mt-6 space-y-4">
            <Input placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <Input placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} type="password" />
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              value={form.plan}
              onChange={e => setForm(f => ({ ...f, plan: e.target.value as Plan }))}
            >
              <option value="free" className="bg-slate-950">Free</option>
              <option value="premium" className="bg-slate-950">Premium</option>
            </select>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <Button onClick={submit} className="w-full">Register</Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Already have an account? <Link href="/login" className="text-cyan-300">Login</Link>
          </p>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
