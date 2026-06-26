import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const styles = {
    primary: 'bg-white text-slate-950 hover:scale-[1.01]',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
    ghost: 'bg-transparent text-white hover:bg-white/5 border border-transparent'
  }[variant];

  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition', styles, className)} {...props} />;
}

export function AnchorButton({
  href,
  className,
  variant = 'primary',
  children
}: {
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}) {
  const styles = {
    primary: 'bg-white text-slate-950 hover:scale-[1.01]',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
    ghost: 'bg-transparent text-white hover:bg-white/5 border border-transparent'
  }[variant];
  return <Link href={href} className={cn('inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition', styles, className)}>{children}</Link>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none ring-0 transition focus:border-cyan-400/40 focus:bg-white/10', props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn('w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/40 focus:bg-white/10', props.className)} />;
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('glass-strong rounded-3xl p-6', className)} />;
}
