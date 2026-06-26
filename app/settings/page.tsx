'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Card, Input, Button } from '@/components/ui';
import { changePassword, getCurrentUser, updateCurrentUser } from '@/lib/auth';

export default function SettingsPage() {
  const [user, setUser] = useState(getCurrentUser());
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [accent, setAccent] = useState('#8b5cf6');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setUser(getCurrentUser());
    const existing = localStorage.getItem('posterflow_settings');
    if (existing) {
      try {
        const data = JSON.parse(existing);
        if (data.accent) setAccent(data.accent);
      } catch {}
    }
  }, []);

  const saveAccent = () => {
    localStorage.setItem('posterflow_settings', JSON.stringify({ accent }));
    setMessage('Appearance saved locally.');
  };

  const savePassword = () => {
    try {
      changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setMessage('Password updated.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to change password.');
    }
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <AuthGuard>
          <Card>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Settings</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Appearance & security</h1>

            <div className="mt-8 grid gap-4">
              <label className="grid gap-2 text-sm text-slate-300">
                Accent color
                <Input type="color" value={accent} onChange={e => setAccent(e.target.value)} className="h-12 px-2 py-2" />
              </label>
              <Button onClick={saveAccent}>Save Appearance</Button>
            </div>

            <div className="mt-8 grid gap-4">
              <h2 className="text-lg font-semibold text-white">Change password</h2>
              <Input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Current password" type="password" />
              <Input value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password" type="password" />
              <Button onClick={savePassword}>Update Password</Button>
            </div>

            {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
            <p className="mt-6 text-xs text-slate-500">Current account: {user?.email ?? '-'}</p>
          </Card>
        </AuthGuard>
      </main>
      <SiteFooter />
    </div>
  );
}
