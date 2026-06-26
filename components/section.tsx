import { cn } from '@/lib/utils';

export function SectionTitle({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p> : null}
    </div>
  );
}
