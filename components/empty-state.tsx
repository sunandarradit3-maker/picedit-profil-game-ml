import { FilePlus2 } from 'lucide-react';

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="glass rounded-3xl p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-white/80">
        <FilePlus2 className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}
