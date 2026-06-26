'use client';

import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Card } from '@/components/ui';
import { WHATSAPP_ADMIN_NUMBER } from '@/lib/constants';
import { Check } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Free</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">3 uses/day</h1>
            <ul className="mt-6 space-y-3">
              {['Basic templates', 'Watermark included', 'Local storage', 'Preview + export'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check className="h-4 w-4 text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border border-cyan-400/20 bg-gradient-to-br from-brand-500/15 to-cyan-400/10">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Premium</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">15 uses/day</h2>
            <ul className="mt-6 space-y-3">
              {['No watermark', 'All features unlocked', 'Priority new templates', 'WhatsApp support'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check className="h-4 w-4 text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${WHATSAPP_ADMIN_NUMBER}?text=${encodeURIComponent('Halo admin, saya ingin upgrade ke Premium PosterFlow.')}`}
              target="_blank"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Upgrade Premium
            </a>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
      }
