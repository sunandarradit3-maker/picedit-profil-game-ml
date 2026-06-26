'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 p-6 text-white">
      <div className="glass-strong max-w-lg rounded-3xl p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-rose-500/15 text-rose-300">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          The page hit an unexpected error. You can retry safely without losing the current app state.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
        >
          <RefreshCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
