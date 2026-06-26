'use client';

import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SectionTitle } from '@/components/section';
import { Card, Button } from '@/components/ui';
import { WHATSAPP_ADMIN_NUMBER, PLANS } from '@/lib/constants';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const features = [
    '3 exports per day',
    'Watermark included',
    'Basic templates',
    'Local storage',
    'Dashboard access'
  ];

  const premium = [
    '15 exports per day',
    'No watermark',
    'All templates unlocked',
    'Priority new features',
    'Admin support via WhatsApp'
  ];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple plan structure that is easy to sell."
          description="Use a free plan to acquire users, then upsell Premium when they hit the watermark or daily limit."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/5">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">{PLANS.free.name}</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-4xl font-semibold text-white">{PLANS.free.price}</span>
              <span className="pb-1 text-sm text-slate-400">/ forever</span>
            </div>
            <ul className="mt-6 space-y-3">
              {features.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check className="h-4 w-4 text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full">Start Free</Button>
          </Card>

          <Card className="border border-cyan-400/20 bg-gradient-to-br from-brand-500/15 to-cyan-400/10">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">{PLANS.premium.name}</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-4xl font-semibold text-white">Custom</span>
              <span className="pb-1 text-sm text-slate-400">contact admin</span>
            </div>
            <ul className="mt-6 space-y-3">
              {premium.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check className="h-4 w-4 text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${WHATSAPP_ADMIN_NUMBER}?text=${encodeURIComponent('Halo admin, saya ingin upgrade ke Premium PosterFlow.')}`}
              target="_blank"
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
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
