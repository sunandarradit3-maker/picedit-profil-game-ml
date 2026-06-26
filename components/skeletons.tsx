export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="h-4 w-1/3 rounded bg-white/10" />
      <div className="mt-4 h-8 w-2/3 rounded bg-white/10" />
      <div className="mt-3 h-4 w-full rounded bg-white/10" />
      <div className="mt-3 h-4 w-5/6 rounded bg-white/10" />
    </div>
  );
}
