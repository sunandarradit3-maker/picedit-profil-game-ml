'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TEMPLATE_PRESETS, WHATSAPP_ADMIN_NUMBER } from '@/lib/constants';
import { Button, Input, Textarea } from './ui';
import { exportNodeAsPdf, exportNodeAsPng } from '@/lib/export';
import { canUseToday, getDailyLimit, registerUsage } from '@/lib/usage';
import type { Plan, Project } from '@/lib/types';
import { AlertCircle, CloudUpload, Download, Sparkles, Save, ImagePlus, Wand2 } from 'lucide-react';
import { saveProject } from '@/lib/storage';
import { uid } from '@/lib/utils';

const fontOptions = [
  { label: 'Inter', value: 'Inter, ui-sans-serif, system-ui' },
  { label: 'Manrope', value: 'Manrope, ui-sans-serif, system-ui' },
  { label: 'Georgia', value: 'Georgia, serif' }
];

const colorPalette = ['#ffffff', '#dbeafe', '#c4b5fd', '#f9a8d4', '#67e8f9', '#86efac', '#fca5a5', '#fde68a'];

function defaultProject(templateId: string): Project {
  const template = TEMPLATE_PRESETS.find(t => t.id === templateId) ?? TEMPLATE_PRESETS[0];
  return {
    id: uid('project'),
    name: `${template.name} Poster`,
    templateId: template.id,
    headline: template.headline,
    subheadline: template.subheadline,
    cta: 'Get Started',
    backgroundA: '#020617',
    backgroundB: '#111827',
    textColor: '#ffffff',
    accentColor: '#22d3ee',
    logoText: 'PF',
    imageDataUrl: '',
    watermarkEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function PosterEditor({
  initialPlan,
  initialProject
}: {
  initialPlan: Plan;
  initialProject?: Project | null;
}) {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [project, setProject] = useState<Project>(initialProject ?? defaultProject(TEMPLATE_PRESETS[0].id));
  const [fontFamily, setFontFamily] = useState(fontOptions[0].value);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const remaining = useMemo(() => canUseToday(plan), [plan]);
  const usageLabel = canUseToday(plan)
    ? `${getDailyLimit(plan)} uses/day available`
    : 'Daily limit reached';

  useEffect(() => {
    if (initialProject) setProject(initialProject);
  }, [initialProject]);

  const update = (patch: Partial<Project>) => {
    setProject(prev => ({ ...prev, ...patch, updatedAt: new Date().toISOString() }));
  };

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ imageDataUrl: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await saveProject(project);
      setMessage('Project saved to IndexedDB.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const doExport = async (kind: 'png' | 'pdf') => {
    if (!remaining) {
      setMessage('Daily limit reached. Upgrade to Premium to continue exporting.');
      return;
    }
    const result = registerUsage(plan);
    try {
      if (!canvasRef.current) throw new Error('Canvas not ready');
      if (kind === 'png') {
        await exportNodeAsPng(canvasRef.current, `${project.name}.png`);
      } else {
        await exportNodeAsPdf(canvasRef.current, `${project.name}.pdf`);
      }
      setMessage(`Exported successfully. ${result.remaining} uses left today.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Export failed.');
    }
  };

  const preset = TEMPLATE_PRESETS.find(t => t.id === project.templateId) ?? TEMPLATE_PRESETS[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="glass-strong rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Poster Builder</h2>
            <p className="mt-1 text-sm text-slate-400">{usageLabel}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={onSave} disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? 'Saving…' : 'Save Project'}
            </Button>
            <Button onClick={() => doExport('png')}>
              <Download className="h-4 w-4" />
              Export PNG
            </Button>
            <Button variant="secondary" onClick={() => doExport('pdf')}>
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-300">
            Project name
            <Input value={project.name} onChange={e => update({ name: e.target.value })} />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            CTA label
            <Input value={project.cta} onChange={e => update({ cta: e.target.value })} />
          </label>
          <label className="grid gap-2 text-sm text-slate-300 lg:col-span-2">
            Headline
            <Textarea rows={3} value={project.headline} onChange={e => update({ headline: e.target.value })} />
          </label>
          <label className="grid gap-2 text-sm text-slate-300 lg:col-span-2">
            Subheadline
            <Textarea rows={2} value={project.subheadline} onChange={e => update({ subheadline: e.target.value })} />
          </label>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <label className="grid gap-2 text-sm text-slate-300">
            Template
            <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              value={project.templateId}
              onChange={e => {
                const next = TEMPLATE_PRESETS.find(t => t.id === e.target.value) ?? TEMPLATE_PRESETS[0];
                update({
                  templateId: next.id,
                  headline: next.headline,
                  subheadline: next.subheadline
                });
              }}
            >
              {TEMPLATE_PRESETS.map(template => (
                <option key={template.id} value={template.id} className="bg-slate-950">
                  {template.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Font
            <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              value={fontFamily}
              onChange={e => setFontFamily(e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font.value} value={font.value} className="bg-slate-950">
                  {font.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Watermark
            <select
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              value={String(project.watermarkEnabled)}
              onChange={e => update({ watermarkEnabled: e.target.value === 'true' })}
            >
              <option value="true" className="bg-slate-950">Enabled</option>
              <option value="false" className="bg-slate-950">Disabled</option>
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-300">
            Background A
            <Input type="color" value={project.backgroundA} onChange={e => update({ backgroundA: e.target.value })} className="h-12 px-2 py-2" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Background B
            <Input type="color" value={project.backgroundB} onChange={e => update({ backgroundB: e.target.value })} className="h-12 px-2 py-2" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Text color
            <Input type="color" value={project.textColor} onChange={e => update({ textColor: e.target.value })} className="h-12 px-2 py-2" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Accent color
            <Input type="color" value={project.accentColor} onChange={e => update({ accentColor: e.target.value })} className="h-12 px-2 py-2" />
          </label>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-300">
            Logo text
            <Input value={project.logoText} onChange={e => update({ logoText: e.target.value })} />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Reference image
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
              <input type="file" accept="image/*" onChange={e => handleFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950" />
            </div>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {colorPalette.map(color => (
            <button key={color} onClick={() => update({ accentColor: color })} className="h-8 w-8 rounded-full border border-white/10" style={{ backgroundColor: color }} aria-label={color} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <AlertCircle className="h-3.5 w-3.5 text-cyan-300" />
            Free plan exports include watermark
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Premium unlocks 15 exports/day
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-strong rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Live Preview</h3>
              <p className="mt-1 text-sm text-slate-400">{preset.name} • {plan.toUpperCase()}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs text-slate-300">
              <Wand2 className="h-3.5 w-3.5" />
              {preset.id}
            </div>
          </div>

          <div
            ref={canvasRef}
            className="mt-5 overflow-hidden rounded-[2rem] border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${project.backgroundA}, ${project.backgroundB})`,
              color: project.textColor,
              fontFamily
            }}
          >
            <div className="relative min-h-[560px] p-7 sm:p-10">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${preset.accent} opacity-40 blur-3xl`} />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-lg font-bold backdrop-blur">
                      {project.logoText}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/60">PosterFlow Studio</p>
                      <p className="text-sm text-white/80">Campaign ready</p>
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
                    {preset.name}
                  </div>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.22em] text-white/80">
                      <ImagePlus className="h-3.5 w-3.5" />
                      Client-side generator
                    </p>
                    <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                      {project.headline}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                      {project.subheadline}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <div className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                        {project.cta}
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80">
                        {WHATSAPP_ADMIN_NUMBER ? 'WhatsApp upgrade ready' : 'Set admin number'}
                      </div>
                    </div>
                  </div>

                  <div className="relative min-h-[280px]">
                    <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
                    {project.imageDataUrl ? (
                      <img src={project.imageDataUrl} alt="Preview image" className="absolute inset-0 h-full w-full rounded-[2rem] object-cover" />
                    ) : (
                      <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${preset.bg} p-6`}>
                        <div className="flex h-full flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-white/80">Premium look</div>
                            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/70">1080 × 1350</div>
                          </div>
                          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Visual balance</p>
                            <p className="mt-2 text-lg font-semibold">Clean layout, strong CTA, and export-ready framing.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="text-sm text-white/70">
                    Built for creators, stores, and product launches.
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
                    {project.watermarkEnabled ? 'Watermark ON' : 'Watermark OFF'}
                  </div>
                </div>
                {project.watermarkEnabled ? (
                  <div className="absolute bottom-5 right-5 rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-white/80">
                    PosterFlow watermark
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
        </div>

        <div className="glass rounded-3xl p-5 sm:p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Upgrade</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Need more exports, no watermark, and premium templates?</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Premium removes the watermark, increases daily usage to 15, and unlocks future templates first.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_ADMIN_NUMBER}?text=${encodeURIComponent('Halo admin, saya ingin upgrade ke Premium PosterFlow.')}`}
            target="_blank"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950"
          >
            <CloudUpload className="h-4 w-4" />
            Upgrade Premium
          </a>
        </div>
      </div>
    </div>
  );
}
