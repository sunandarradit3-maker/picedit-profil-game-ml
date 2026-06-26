'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SectionTitle } from '@/components/section';
import { Button, AnchorButton } from '@/components/ui';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { ArrowRight, CheckCircle2, Layers3, Wand2, ShieldCheck, MonitorSmartphone, Sparkles, MessageCircleMore } from 'lucide-react';
import { getCurrentUser, seedUsers } from '@/lib/auth';

const features = [
  { title: 'Fast client-side builder', desc: 'Semua editing berjalan di browser tanpa API biaya per request.', icon: Wand2 },
  { title: 'Subscription gating', desc: 'Free 3 penggunaan per hari, Premium 15, plus watermark control.', icon: ShieldCheck },
  { title: 'Responsive by default', desc: 'Mobile-first layout dengan glassmorphism dan motion yang halus.', icon: MonitorSmartphone },
  { title: 'Export ready', desc: 'Render ke PNG dan PDF langsung dari DOM preview.', icon: Layers3 }
];

const bullets = [
  'Landing page optimised for conversion',
  'Dashboard with stats and recent projects',
  'Login, register, profile, settings, admin panel',
  'Loading, error, empty state, and skeleton screens'
];

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    seedUsers();
    setAuthed(Boolean(getCurrentUser()));
    setReady(true);
  }, []);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.22em] text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  {APP_NAME} • SaaS ready
                </div>
                <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                  Build premium posters and thumbnails straight in the browser.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {APP_TAGLINE}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <AnchorButton href={authed ? '/dashboard' : '/register'}>
                    {authed ? 'Open Dashboard' : 'Start Free'}
                    <ArrowRight className="h-4 w-4" />
                  </AnchorButton>
                  <AnchorButton href="/pricing" variant="secondary">
                    View Pricing
                  </AnchorButton>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {bullets.map(item => (
                    <div key={item} className="inline-flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-strong relative rounded-[2rem] p-4 sm:p-6">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Live Preview</span>
                    <span>Vercel-ready</span>
                  </div>
                  <div className="mt-4 rounded-[1.5rem] bg-gradient-to-br from-brand-500/25 via-cyan-400/20 to-transparent p-5">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Creator SaaS</p>
                      <h3 className="mt-3 text-3xl font-semibold text-white">Professional visuals without paid APIs.</h3>
                      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
                        Use templates, custom text, local storage, and export tools to ship visuals faster.
                      </p>
                      <div className="mt-5 flex gap-3">
                        <div className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">Create</div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">Export</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {['Landing', 'Dashboard', 'Admin'].map(label => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Features"
            title="Everything a subscription SaaS needs."
            description="PosterFlow is built to feel premium while staying cheap to operate: no paid APIs, no backend dependency for core use, and storage stays local."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="glass rounded-3xl p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <SectionTitle
                  eyebrow="Monetization"
                  title="Free attracts, Premium converts."
                  description="Free gives three exports per day with watermark. Premium raises the cap, removes watermark, and unlocks future templates first."
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <AnchorButton href="/subscription">Subscription page</AnchorButton>
                  <a href={`https://wa.me/6281234567890?text=${encodeURIComponent('Halo admin, saya ingin upgrade ke Premium PosterFlow.')}`} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                    <MessageCircleMore className="h-4 w-4" />
                    Upgrade Premium
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Free', '3 uses/day', 'Watermark on'],
                  ['Premium', '15 uses/day', 'Watermark off'],
                  ['Storage', 'Local-first', 'IndexedDB projects'],
                  ['Deploy', 'Vercel ready', 'No paid API']
                ].map(([a, b, c]) => (
                  <div key={a} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                    <p className="text-sm text-slate-400">{a}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{b}</p>
                    <p className="mt-2 text-xs text-slate-500">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
