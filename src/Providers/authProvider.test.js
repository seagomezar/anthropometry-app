import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import authProvider from './authProvider';
import { hashPassword } from '../Utils/cryptoUtils';

describe('authProvider RBAC and Credentials', () => {
  let originalFetch;

  beforeEach(async () => {
    localStorage.clear();
    originalFetch = global.fetch;

    const wilsonHash = await hashPassword('WilsonRave2026!');
    const carolinaHash = await hashPassword('Carolina2026!');

    global.fetch = vi.fn(async (url, options) => {
      try {
        const body = JSON.parse(options?.body || '{}');
        const email = (body?.variables?.email || '').replace(/%/g, '').toLowerCase();

        if (email.includes('wilravec18')) {
          return {
            ok: true,
            json: async () => ({
              data: {
                nutritionist: [
                  {
                    id: 1,
                    firstname: 'Wilson',
                    lastname: 'Rave',
                    email: 'wilravec18@gmail.com',
                    password: wilsonHash,
                  },
                ],
              },
            }),
          };
        }

        if (email.includes('carolina.gomez')) {
          return {
            ok: true,
            json: async () => ({
              data: {
                nutritionist: [
                  {
                    id: 2,
                    firstname: 'Carolina',
                    lastname: 'Gomez',
                    email: 'carolina.gomez@anthropometry.com',
                    password: carolinaHash,
                  },
                ],
              },
            }),
          };
        }

        return {
          ok: true,
          json: async () => ({ data: { nutritionist: [] } }),
        };
      } catch (e) {
        return {
          ok: true,
          json: async () => ({ data: { nutritionist: [] } }),
        };
      }
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('authenticates Super Admin with valid credentials and provides admin permissions', async () => {
    await expect(authProvider.checkAuth()).rejects.toBeUndefined();

    const loginResult = await authProvider.login({
      username: 'admin@anthropometry.com',
      password: 'Admin2026!',
    });
    expect(loginResult).toEqual({ redirectTo: '/' });

    await expect(authProvider.checkAuth()).resolves.toBeUndefined();

    const permissions = await authProvider.getPermissions();
    expect(permissions).toEqual({
      role: 'admin',
      nutritionistId: undefined,
    });

    const identity = await authProvider.getIdentity();
    expect(identity).toEqual({
      id: 'super-admin',
      fullName: 'Super Administrador',
      role: 'admin',
    });
  });

  it('authenticates Nutritionist (Wilson Rave) and scopes permissions to his nutritionistId', async () => {
    const loginResult = await authProvider.login({
      username: 'wilravec18@gmail.com',
      password: 'WilsonRave2026!',
    });
    expect(loginResult).toEqual({ redirectTo: '/' });

    await expect(authProvider.checkAuth()).resolves.toBeUndefined();

    const permissions = await authProvider.getPermissions();
    expect(permissions).toEqual({
      role: 'nutritionist',
      nutritionistId: 1,
    });

    const identity = await authProvider.getIdentity();
    expect(identity.fullName).toContain('Wilson');
    expect(identity.role).toBe('nutritionist');
  });

  it('authenticates second Nutritionist (Carolina Gomez) and scopes permissions to her nutritionistId', async () => {
    const loginResult = await authProvider.login({
      username: 'carolina.gomez@anthropometry.com',
      password: 'Carolina2026!',
    });
    expect(loginResult).toEqual({ redirectTo: '/' });

    await expect(authProvider.checkAuth()).resolves.toBeUndefined();

    const permissions = await authProvider.getPermissions();
    expect(permissions).toEqual({
      role: 'nutritionist',
      nutritionistId: 2,
    });

    const identity = await authProvider.getIdentity();
    expect(identity.fullName).toContain('Carolina');
    expect(identity.role).toBe('nutritionist');
  });

  it('rejects invalid credentials', async () => {
    await expect(
      authProvider.login({
        username: 'wilravec18@gmail.com',
        password: 'WrongPassword123!',
      })
    ).rejects.toThrow();

    await expect(
      authProvider.login({
        username: 'unknown@user.com',
        password: 'SomePassword',
      })
    ).rejects.toThrow();

    await expect(authProvider.checkAuth()).rejects.toBeUndefined();
  });

  it('clears session on logout', async () => {
    await authProvider.login({
      username: 'admin@anthropometry.com',
      password: 'Admin2026!',
    });
    await expect(authProvider.checkAuth()).resolves.toBeUndefined();

    await authProvider.logout();
    await expect(authProvider.checkAuth()).rejects.toBeUndefined();
    expect(localStorage.getItem('anthropometry_session')).toBeNull();
  });
});
