import { describe, it, expect, beforeEach } from 'vitest';
import authProvider from './authProvider';

describe('authProvider RBAC and Credentials', () => {
  beforeEach(() => {
    localStorage.clear();
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
