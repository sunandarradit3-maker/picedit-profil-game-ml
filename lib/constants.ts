export const APP_NAME = 'PosterFlow';
export const APP_TAGLINE = 'Browser-first poster & thumbnail studio for modern creators.';
export const WHATSAPP_ADMIN_NUMBER = '6281234567890'; // ganti sendiri
export const FREE_DAILY_LIMIT = 3;
export const PREMIUM_DAILY_LIMIT = 15;
export const FREE_WATERMARK = true;
export const PREMIUM_WATERMARK = false;

export const PLANS = {
  free: {
    name: 'Free',
    price: 'Rp0',
    limit: FREE_DAILY_LIMIT,
    watermark: true,
    cta: 'Start Free'
  },
  premium: {
    name: 'Premium',
    price: 'Custom',
    limit: PREMIUM_DAILY_LIMIT,
    watermark: false,
    cta: 'Upgrade Premium'
  }
} as const;

export const TEMPLATE_PRESETS = [
  {
    id: 'neon-launch',
    name: 'Neon Launch',
    accent: 'from-fuchsia-500 via-violet-500 to-cyan-400',
    bg: 'from-slate-950 to-slate-900',
    headline: 'Launch faster with a sharp, premium poster',
    subheadline: 'Built for product drops, promos, and content creators.'
  },
  {
    id: 'stripe-sale',
    name: 'Stripe Sale',
    accent: 'from-sky-400 via-blue-500 to-indigo-500',
    bg: 'from-slate-950 to-slate-800',
    headline: 'Simple layouts that convert',
    subheadline: 'Focus attention on the offer with crisp hierarchy.'
  },
  {
    id: 'apple-minimal',
    name: 'Apple Minimal',
    accent: 'from-emerald-400 via-teal-400 to-cyan-400',
    bg: 'from-slate-950 to-zinc-900',
    headline: 'Minimal, clean, and editorial',
    subheadline: 'Perfect for premium brand storytelling.'
  }
] as const;
