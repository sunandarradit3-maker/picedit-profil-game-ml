import { FREE_DAILY_LIMIT, PREMIUM_DAILY_LIMIT } from './constants';
import { getUsage, setUsage } from './storage';
import { todayKey } from './utils';
import type { Plan } from './types';

export function getDailyLimit(plan: Plan) {
  return plan === 'premium' ? PREMIUM_DAILY_LIMIT : FREE_DAILY_LIMIT;
}

export function getRemainingUses(plan: Plan) {
  const usage = getUsage(todayKey());
  return Math.max(0, getDailyLimit(plan) - usage.count);
}

export function canUseToday(plan: Plan) {
  return getRemainingUses(plan) > 0;
}

export function registerUsage(plan: Plan) {
  const key = todayKey();
  const usage = getUsage(key);
  const next = { date: key, count: usage.count + 1 };
  setUsage(next);
  return {
    used: next.count,
    limit: getDailyLimit(plan),
    remaining: Math.max(0, getDailyLimit(plan) - next.count)
  };
}
