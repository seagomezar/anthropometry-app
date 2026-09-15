import { describe, it, expect } from 'vitest';
import {
  generateSalt,
  hashPassword,
  verifyPassword,
  evaluatePasswordStrength,
} from './cryptoUtils';

describe('cryptoUtils', () => {
  it('generates a non-empty hex salt', () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    expect(salt1).toBeTruthy();
    expect(salt2).toBeTruthy();
    expect(salt1).not.toEqual(salt2);
  });

  it('hashes password with salt format sha256:{salt}:{hash}', async () => {
    const password = 'TestPassword123!';
    const hashed = await hashPassword(password);
    expect(hashed.startsWith('sha256:')).toBe(true);
    const parts = hashed.split(':');
    expect(parts.length).toBe(3);
    expect(parts[1].length).toBeGreaterThan(0);
    expect(parts[2].length).toBeGreaterThan(0);
  });

  it('verifies correct password against hashed string', async () => {
    const password = 'SecretPassword2026!';
    const hashed = await hashPassword(password);
    const isValid = await verifyPassword(password, hashed);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPassword('WrongPassword', hashed);
    expect(isInvalid).toBe(false);
  });

  it('verifies legacy plaintext password for backward compatibility', async () => {
    const legacyPlaintext = 'WilsonRave2026!';
    const isValid = await verifyPassword('WilsonRave2026!', legacyPlaintext);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPassword('WrongPlaintext', legacyPlaintext);
    expect(isInvalid).toBe(false);
  });

  it('evaluates password strength accurately', () => {
    const weak = evaluatePasswordStrength('short');
    expect(weak.score).toBeLessThan(50);

    const medium = evaluatePasswordStrength('Password123');
    expect(medium.score).toBeGreaterThanOrEqual(40);

    const strong = evaluatePasswordStrength('Anthropometry2026!#$');
    expect(strong.score).toBeGreaterThanOrEqual(80);
    expect(strong.label).toBe('Excelente');
  });
});
