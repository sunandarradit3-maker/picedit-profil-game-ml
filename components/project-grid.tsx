'use client';

import { useEffect, useMemo, useState } from 'react';
import { deleteProject, listProjects } from '@/lib/storage';
import type { Project } from '@/lib/types';
import { Button } from './ui';
import { Trash2, Copy, Download, PencilLine } from 'lucide-react';

export function ProjectGrid({
  onSelect,
  refreshToken
}: {
  onSelect: (project: Project) => void;
  refreshToken?: number;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const items = await listProjects();
    setProjects(items);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [refreshToken]);

  const duplicates = async (project: Project) => {
    const copy = {
      ...project,
      id: `${project.id}_copy_${Date.now()}`,
      name: `${project.name} Copy`,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    await deleteProject('___noop___').catch(() => {});
    await import('@/lib/storage').then(({ saveProject }) => saveProject(copy));
    refresh();
  };

  const remove = async (id: string) => {
    await deleteProject(id);
    refresh();
  };

  if (loading) {
    return <div className="glass rounded-3xl p-6 text-sm text-slate-300">Loading projects…</div>;
  }

  if (!projects.length) {
    return (
      <div className="glass rounded-3xl p-8 text-center text-slate-300">
        No projects yet. Build your first poster to see it here.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map(project => (
        <div key={project.id} className="glass-strong rounded-3xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{new Date(project.updatedAt).toLocaleString('id-ID')}</p>
            </div>
            <div className="rounded-2xl bg-white/5 px-3 py-1 text-xs text-slate-300">{project.templateId}</div>
          </div>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-300">{project.headline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => onSelect(project)} className="px-3 py-2 text-xs">
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </Button>
            <Button variant="secondary" onClick={() => duplicates(project)} className="px-3 py-2 text-xs">
              <Copy className="h-3.5 w-3.5" />
              Duplicate
            </Button>
            <Button variant="secondary" onClick={() => remove(project.id)} className="px-3 py-2 text-xs">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
