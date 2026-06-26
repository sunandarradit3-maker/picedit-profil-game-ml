'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth-guard';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SectionTitle } from '@/components/section';
import { Card, AnchorButton } from '@/components/ui';
import { getCurrentUser } from '@/lib/auth';
import { listProjects } from '@/lib/storage';
import { getRemainingUses } from '@/lib/usage';
import { StatCard } from '@/components/stat-card';
import { CalendarDays, Layers3, CircleDollarSign, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
    listProjects().then(setProjects);
  }, []);

  const plan = user?.plan ?? 'free';

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <AuthGuard>
          <SectionTitle eyebrow="Dashboard" title={`Hello, ${user?.name ?? 'Creator'}.`} description="Track usage, recent projects, and quick access to the editor." />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatCard label="Plan" value={plan.toUpperCase()} hint={plan === 'premium' ? 'No watermark' : 'Watermark enabled'} />
            <StatCard label="Remaining uses today" value={`${getRemainingUses(plan)}`} hint={plan === 'free' ? 'Limit 3/day' : 'Limit 15/day'} />
            <StatCard label="Saved projects" value={`${projects.length}`} hint="Stored in IndexedDB" />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Quick actions</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Start building faster</h2>
                </div>
                <CalendarDays className="h-6 w-6 text-white/50" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <AnchorButton href="/builder">Open Builder <ArrowRight className="h-4 w-4" /></AnchorButton>
                <AnchorButton href="/subscription" variant="secondary">Subscription</AnchorButton>
                <AnchorButton href="/settings" variant="secondary">Settings</AnchorButton>
              </div>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                Tip: export PNG when you need social media assets and PDF for client handoff or printable proofing.
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Recent activity</h3>
                <Layers3 className="h-5 w-5 text-white/50" />
              </div>
              <div className="mt-5 space-y-3">
                {projects.slice(0, 4).map(project => (
                  <div key={project.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium text-white">{project.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{new Date(project.updatedAt).toLocaleString('id-ID')}</p>
                  </div>
                ))}
                {!projects.length ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400">
                    No projects yet. Open the builder to create one.
                  </div>
                ) : null}
              </div>
            </Card>
          </div>
        </AuthGuard>
      </main>
      <SiteFooter />
    </div>
  );
}
