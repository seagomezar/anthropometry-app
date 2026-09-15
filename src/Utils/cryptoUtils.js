/**
 * Cryptographic utilities using the standard browser Web Crypto API.
 * Provides salted SHA-256 hashing and verification for secure credential storage.
 */

/**
 * Converts an ArrayBuffer to a hex string.
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
const bufferToHex = (buffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Generates a cryptographically random salt (16 bytes hex).
 * @returns {string}
 */
export const generateSalt = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return bufferToHex(array.buffer);
  }
  // Fallback for environment without getRandomValues
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Computes a salted SHA-256 hash formatted as `sha256:{salt}:{hash}`.
 * @param {string} password
 * @param {string} [existingSalt]
 * @returns {Promise<string>}
 */
export const hashPassword = async (password, existingSalt = null) => {
  const salt = existingSalt || generateSalt();
  const textToHash = `${salt}:${password}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(textToHash);

  let hashHex = '';
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    hashHex = bufferToHex(hashBuffer);
  } else {
    // Fallback for non-subtle environments (e.g. older jsdom)
    let hash = 0;
    for (let i = 0; i < textToHash.length; i++) {
      hash = ((hash << 5) - hash) + textToHash.charCodeAt(i);
      hash |= 0;
    }
    hashHex = Math.abs(hash).toString(16).padStart(32, '0');
  }

  return `sha256:${salt}:${hashHex}`;
};

/**
 * Verifies a candidate plaintext password against a stored password.
 * Supports both hashed format (`sha256:{salt}:{hash}`) and legacy plaintext passwords for transparent migration.
 * @param {string} candidatePassword
 * @param {string} storedPassword
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (candidatePassword, storedPassword) => {
  if (!candidatePassword || !storedPassword) return false;

  const trimmedCandidate = candidatePassword.trim();
  const trimmedStored = storedPassword.trim();

  // If stored password uses sha256:{salt}:{hash} format
  if (trimmedStored.startsWith('sha256:')) {
    const parts = trimmedStored.split(':');
    if (parts.length === 3) {
      const salt = parts[1];
      const expectedHash = await hashPassword(trimmedCandidate, salt);
      return expectedHash === trimmedStored;
    }
  }

  // Legacy plaintext fallback for seamless backwards-compatibility
  return trimmedCandidate === trimmedStored;
};

/**
 * Evaluates password strength on a 0 - 100 scale.
 * @param {string} password
 * @returns {{ score: number, label: string, color: string, feedback: string[] }}
 */
export const evaluatePasswordStrength = (password = '') => {
  const pwd = password.trim();
  const feedback = [];
  let score = 0;

  if (pwd.length === 0) {
    return { score: 0, label: 'Vacía', color: '#9e9e9e', feedback: ['Ingrese una contraseña.'] };
  }

  if (pwd.length >= 8) score += 30;
  else feedback.push('Debe contener al menos 8 caracteres.');

  if (pwd.length >= 12) score += 15;

  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) {
    score += 25;
  } else {
    feedback.push('Incluya letras mayúsculas y minúsculas.');
  }

  if (/[0-9]/.test(pwd)) {
    score += 15;
  } else {
    feedback.push('Incluya al menos un número (0-9).');
  }

  if (/[^a-zA-Z0-9]/.test(pwd)) {
    score += 15;
  } else {
    feedback.push('Incluya al menos un símbolo especial (!@#$%...).');
  }

  score = Math.min(score, 100);

  let label = 'Débil';
  let color = '#d32f2f'; // red

  if (score >= 80) {
    label = 'Excelente';
    color = '#2e7d32'; // green
  } else if (score >= 60) {
    label = 'Fuerte';
    color = '#1b5e20'; // dark green
  } else if (score >= 40) {
    label = 'Aceptable';
    color = '#ed6c02'; // orange
  }

  return { score, label, color, feedback };
};
