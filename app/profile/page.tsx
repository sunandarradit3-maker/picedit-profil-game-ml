'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Card, Input, Button } from '@/components/ui';
import { getCurrentUser, updateCurrentUser } from '@/lib/auth';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const [user, setUser] = useState(getCurrentUser());
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setName(current?.name ?? '');
    setEmail(current?.email ?? '');
  }, []);

  const save = () => {
    try {
      const updated = updateCurrentUser({ name, email: email.toLowerCase() });
      setUser(updated);
      setMessage('Profile saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to save profile.');
    }
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <AuthGuard>
          <Card>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Profile</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Personal details</h1>
            <div className="mt-6 space-y-4">
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
              <Button onClick={save}>Save Profile</Button>
              {message ? <p className="text-sm text-slate-300">{message}</p> : null}
            </div>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
              Account created: {user ? formatDate(new Date(user.createdAt)) : '-'}
            </div>
          </Card>
        </AuthGuard>
      </main>
      <SiteFooter />
    </div>
  );
}
