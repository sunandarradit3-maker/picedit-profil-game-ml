export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100">
      <div className="glass rounded-3xl px-8 py-10 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="text-sm text-slate-300">Loading PosterFlow…</p>
      </div>
    </div>
  );
}
