import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center p-6 text-white">
      <div className="glass-strong max-w-xl rounded-3xl p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          The route you requested does not exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <button onClick={() => history.back()} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
