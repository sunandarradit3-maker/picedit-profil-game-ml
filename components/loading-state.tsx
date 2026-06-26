export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="glass rounded-3xl p-6 text-sm text-slate-300">
      <div className="inline-flex items-center gap-2">
        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
        {label}
      </div>
    </div>
  );
}
