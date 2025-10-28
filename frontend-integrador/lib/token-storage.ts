// src/lib/token-storage.ts
const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export const tokens = {
  save(accessToken: string, refreshToken?: string) {
    if (typeof window === 'undefined') return;
    if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  },
  getAccess() {
    return typeof window === 'undefined' ? null : localStorage.getItem(ACCESS_KEY);
  },
  getRefresh() {
    return typeof window === 'undefined' ? null : localStorage.getItem(REFRESH_KEY);
  },
  clear() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
