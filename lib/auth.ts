import { clearSession, getSession, getUsers, saveUsers, setSession } from './storage';
import { uid } from './utils';
import type { Plan, User } from './types';

const ADMIN_EMAIL = 'admin@posterflow.app';

export function seedUsers() {
  if (typeof window === 'undefined') return;
  const users = getUsers();
  if (users.length > 0) return;

  const base: User[] = [
    {
      id: uid('user'),
      name: 'PosterFlow Admin',
      email: ADMIN_EMAIL,
      password: 'admin123',
      plan: 'premium',
      role: 'admin',
      createdAt: new Date().toISOString(),
      avatarSeed: 'admin'
    }
  ];
  saveUsers(base);
  setSession(base[0].id);
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
  plan?: Plan;
}) {
  const users = getUsers();
  const normalized = input.email.trim().toLowerCase();
  if (users.some(u => u.email === normalized)) {
    throw new Error('Email already registered.');
  }
  const user: User = {
    id: uid('user'),
    name: input.name.trim(),
    email: normalized,
    password: input.password,
    plan: input.plan ?? 'free',
    role: normalized === ADMIN_EMAIL ? 'admin' : 'user',
    createdAt: new Date().toISOString(),
    avatarSeed: normalized.split('@')[0]
  };
  users.push(user);
  saveUsers(users);
  setSession(user.id);
  return user;
}

export function loginUser(email: string, password: string) {
  const users = getUsers();
  const normalized = email.trim().toLowerCase();
  const user = users.find(u => u.email === normalized && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password.');
  }
  setSession(user.id);
  return user;
}

export function logoutUser() {
  clearSession();
}

export function getCurrentUser() {
  const session = getSession();
  const users = getUsers();
  return users.find(u => u.id === session.userId) ?? null;
}

export function updateCurrentUser(patch: Partial<User>) {
  const current = getCurrentUser();
  if (!current) throw new Error('No authenticated user.');
  const users = getUsers().map(u => (u.id === current.id ? { ...u, ...patch } : u));
  saveUsers(users);
  return users.find(u => u.id === current.id) ?? null;
}

export function changePassword(oldPassword: string, newPassword: string) {
  const current = getCurrentUser();
  if (!current) throw new Error('No authenticated user.');
  if (current.password !== oldPassword) throw new Error('Current password is incorrect.');
  const users = getUsers().map(u => (u.id === current.id ? { ...u, password: newPassword } : u));
  saveUsers(users);
  return users.find(u => u.id === current.id) ?? null;
}

export function ensureAdmin() {
  const current = getCurrentUser();
  return Boolean(current && current.role === 'admin');
}
