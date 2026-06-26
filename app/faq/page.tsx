'use client';

import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SectionTitle } from '@/components/section';
import { Card } from '@/components/ui';

const faqs = [
  ['Apakah butuh API key?', 'Tidak. Fitur inti berjalan sepenuhnya di browser dan storage lokal.'],
  ['Apakah aman untuk deploy ke Vercel?', 'Ya. Project ini statik-friendly dan kompatibel dengan App Router.'],
  ['Apa perbedaan Free dan Premium?', 'Free 3 penggunaan per hari dengan watermark. Premium 15 penggunaan per hari tanpa watermark.'],
  ['Apakah data tersimpan di server?', 'Tidak untuk versi ini. Auth dasar, setting, dan usage tersimpan di LocalStorage. Proyek tersimpan di IndexedDB.'],
  ['Bisa untuk jualan subscription?', 'Ya. Trigger upgrade dibawa ke WhatsApp admin dengan tombol Upgrade Premium.']
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="FAQ" title="Answers to common buyer questions." description="Let users understand the value and constraints without friction." />
        <div className="mt-10 space-y-4">
          {faqs.map(([q, a]) => (
            <Card key={q}>
              <p className="text-lg font-semibold text-white">{q}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{a}</p>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
