'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SectionTitle } from '@/components/section';
import { PosterEditor } from '@/components/poster-editor';
import { getCurrentUser } from '@/lib/auth';
import { useSearchParams } from 'next/navigation';
import { listProjects } from '@/lib/storage';
import type { Project } from '@/lib/types';
import { LoadingState } from '@/components/loading-state';

export default function BuilderPage() {
  const params = useSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const id = params.get('project');
      const items = await listProjects();
      if (!mounted) return;
      setProject(items.find(item => item.id === id) ?? null);
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, [params]);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <AuthGuard>
          <SectionTitle eyebrow="Builder" title="Create a production-ready poster in minutes." description="Use templates, colors, text, and a reference image. Export locally without external APIs." />
          <div className="mt-8">
            {loading ? <LoadingState label="Loading project…" /> : <PosterEditor initialPlan={user?.plan ?? 'free'} initialProject={project} />}
          </div>
        </AuthGuard>
      </main>
      <SiteFooter />
    </div>
  );
}
