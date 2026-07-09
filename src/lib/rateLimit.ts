const ipRequests: Map<string, { count: number; start: number }> = new Map();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now - entry.start > WINDOW_MS) {
    ipRequests.set(ip, { count: 1, start: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
