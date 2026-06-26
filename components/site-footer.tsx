import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold">{APP_NAME}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Browser-first SaaS untuk membuat visual promosi cepat, rapi, dan siap ekspor tanpa biaya API.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-400">
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/subscription">Subscription</Link>
        </div>
        <div className="text-sm text-slate-400">
          <p className="font-medium text-white">Built for Vercel</p>
          <p className="mt-3 leading-6">Next.js App Router, Tailwind CSS, Framer Motion, and local-first storage.</p>
        </div>
      </div>
    </footer>
  );
}
