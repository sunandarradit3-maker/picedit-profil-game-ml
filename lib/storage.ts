import { openDB } from 'idb';
import type { Project, Ticket, Usage, User } from './types';

const DB_NAME = 'posterflow-db';
const STORE_PROJECTS = 'projects';
const STORE_TICKETS = 'tickets';
const LOCAL_USERS = 'posterflow_users';
const LOCAL_SESSION = 'posterflow_session';
const LOCAL_USAGE_PREFIX = 'posterflow_usage_';

async function db() {
  return openDB(DB_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE_PROJECTS)) {
        database.createObjectStore(STORE_PROJECTS, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORE_TICKETS)) {
        database.createObjectStore(STORE_TICKETS, { keyPath: 'id' });
      }
    }
  });
}

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  return safeJsonParse<User[]>(localStorage.getItem(LOCAL_USERS), []);
}

export function saveUsers(users: User[]) {
  localStorage.setItem(LOCAL_USERS, JSON.stringify(users));
}

export function getSession() {
  if (typeof window === 'undefined') return { userId: null };
  return safeJsonParse<{ userId: string | null }>(localStorage.getItem(LOCAL_SESSION), { userId: null });
}

export function setSession(userId: string | null) {
  localStorage.setItem(LOCAL_SESSION, JSON.stringify({ userId }));
}

export function clearSession() {
  localStorage.removeItem(LOCAL_SESSION);
}

export function getUsage(dateKey: string): Usage {
  if (typeof window === 'undefined') return { date: dateKey, count: 0 };
  return safeJsonParse<Usage>(localStorage.getItem(`${LOCAL_USAGE_PREFIX}${dateKey}`), { date: dateKey, count: 0 });
}

export function setUsage(usage: Usage) {
  localStorage.setItem(`${LOCAL_USAGE_PREFIX}${usage.date}`, JSON.stringify(usage));
}

export function getAllUsageKeys() {
  if (typeof window === 'undefined') return [];
  return Object.keys(localStorage).filter(key => key.startsWith(LOCAL_USAGE_PREFIX));
}

export async function listProjects(): Promise<Project[]> {
  const database = await db();
  return (await database.getAll(STORE_PROJECTS)).sort((a: Project, b: Project) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveProject(project: Project) {
  const database = await db();
  await database.put(STORE_PROJECTS, project);
}

export async function deleteProject(id: string) {
  const database = await db();
  await database.delete(STORE_PROJECTS, id);
}

export async function listTickets(): Promise<Ticket[]> {
  const database = await db();
  return (await database.getAll(STORE_TICKETS)).sort((a: Ticket, b: Ticket) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveTicket(ticket: Ticket) {
  const database = await db();
  await database.put(STORE_TICKETS, ticket);
}
