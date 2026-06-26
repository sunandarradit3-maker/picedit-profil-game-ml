'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Card } from '@/components/ui';
import { ensureAdmin, getUsers } from '@/lib/auth';
import { listProjects, listTickets, getAllUsageKeys } from '@/lib/storage';

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState({ users: 0, projects: 0, tickets: 0, usageKeys: 0, premium: 0 });

  useEffect(() => {
    const load = async () => {
      const users = getUsers();
      const projects = await listProjects();
      const tickets = await listTickets();
      setStats({
        users: users.length,
        projects: projects.length,
        tickets: tickets.length,
        usageKeys: getAllUsageKeys().length,
        premium: users.filter(u => u.plan === 'premium').length
      });
      setReady(true);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <AuthGuard>
          {ensureAdmin() ? (
            <>
              <h1 className="text-3xl font-semibold text-white">Admin Panel</h1>
              <p className="mt-3 text-sm text-slate-300">Local analytics and support center.</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {[
                  ['Users', stats.users],
                  ['Premium', stats.premium],
                  ['Projects', stats.projects],
                  ['Tickets', stats.tickets],
                  ['Usage keys', stats.usageKeys]
                ].map(([label, value]) => (
                  <Card key={String(label)}>
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{String(value)}</p>
                  </Card>
                ))}
              </div>
              <Card className="mt-8">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Ops notes</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                  <li>• Handle upgrade requests via WhatsApp number in constants.</li>
                  <li>• Review support messages from the Contact page.</li>
                  <li>• Promote Premium by limiting the free daily quota.</li>
                </ul>
              </Card>
            </>
          ) : (
            <Card>
              <p className="text-lg font-semibold text-white">Admin access only</p>
              <p className="mt-2 text-sm text-slate-300">Use the seeded admin account to open this panel.</p>
            </Card>
          )}
        </AuthGuard>
      </main>
      <SiteFooter />
    </div>
  );
              }
