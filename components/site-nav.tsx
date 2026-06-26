'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { APP_NAME, WHATSAPP_ADMIN_NUMBER } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import { UserCircle2, LogOut, Menu, X } from 'lucide-react';

const nav = [
  ['Features', '/#features'],
  ['Pricing', '/pricing'],
  ['FAQ', '/faq'],
  ['Contact', '/contact']
] as const;

export function SiteNav() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);

  useEffect(() => {
    setMounted(true);
    setUser(getCurrentUser());
    const onStorage = () => setUser(getCurrentUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 text-sm font-black text-slate-950 shadow-lg">
            PF
          </div>
          <div>
            <p className="text-sm font-semibold">{APP_NAME}</p>
            <p className="text-xs text-slate-400">Creator SaaS</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {mounted && user ? (
            <>
              <Link href="/dashboard" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                Dashboard
              </Link>
              <Link href="/profile" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                Profile
              </Link>
              <button onClick={logout} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-slate-300 transition hover:text-white">Login</Link>
              <Link href="/register" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">Register</Link>
            </>
          )}
          <a
            href={`https://wa.me/${WHATSAPP_ADMIN_NUMBER}?text=${encodeURIComponent('Halo admin, saya ingin upgrade ke Premium PosterFlow.')}`}
            target="_blank"
            className="rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Upgrade Premium
          </a>
        </div>

        <button onClick={() => setOpen(v => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                {label}
              </Link>
            ))}
            {mounted && user ? (
              <>
                <Link href="/dashboard" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">Dashboard</Link>
                <Link href="/profile" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">Profile</Link>
                <button onClick={logout} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">Login</Link>
                <Link href="/register" className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">Register</Link>
              </>
            )}
            <a href={`https://wa.me/${WHATSAPP_ADMIN_NUMBER}?text=${encodeURIComponent('Halo admin, saya ingin upgrade ke Premium PosterFlow.')}`} target="_blank" className="rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-slate-950">
              Upgrade Premium
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
