export type Plan = 'free' | 'premium';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: Plan;
  role: 'user' | 'admin';
  createdAt: string;
  avatarSeed: string;
};

export type Session = {
  userId: string | null;
};

export type DesignTemplate = {
  id: string;
  name: string;
  accent: string;
  bg: string;
  headline: string;
  subheadline: string;
};

export type Project = {
  id: string;
  name: string;
  templateId: string;
  headline: string;
  subheadline: string;
  cta: string;
  backgroundA: string;
  backgroundB: string;
  textColor: string;
  accentColor: string;
  logoText: string;
  imageDataUrl?: string;
  watermarkEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Usage = {
  date: string;
  count: number;
};

export type Ticket = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'open' | 'closed';
};
