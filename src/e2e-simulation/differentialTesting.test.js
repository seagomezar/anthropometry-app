import { describe, it, expect } from 'vitest';
import { generateResults as modernGenerateResults } from '../Providers/retultsProvider';
import authProvider from '../Providers/authProvider';
import byPassAuthProvider from '../Providers/byPassAuthProvider';
import { DeterministicPRNG, ArbitraryGenerators, checkProperty } from './pbtEngine';

/**
 * Historical Legacy Implementation of generateResults prior to safety refactor.
 * Uses strict bare keys and standard arithmetic without null-safe coercion.
 */
function legacyGenerateResults(measurement, height, weight, gender) {
  function legacyYhasz(m, g) {
    if (!m) return null;
    const { subscapular, triceps, supraspinale, abdominal, front_thigh, medial_calf } = m;
    if (!subscapular || !triceps || !supraspinale || !abdominal || !front_thigh || !medial_calf) return null;
    const sum = subscapular + triceps + supraspinale + abdominal + front_thigh + medial_calf;
    return g ? 0.1051 * sum + 2.585 : 0.1548 * sum + 3.58;
  }

  function legacyFaulkner(m, g) {
    if (!m) return 0;
    const sum = m.subscapular + m.triceps + m.iliac_crest + m.abdominal;
    return g ? 0.153 * sum + 5.783 : 0.213 * sum + 7.9;
  }

  function legacyParizcova(m) {
    if (!m) return 0;
    return 2.745 + 0.0008 * m.triceps + 0.002 * m.subscapular + 0.637 * m.iliac_crest + 0.809 * m.biceps;
  }

  function legacyEndo(m, h) {
    if (!m || !h) return 0;
    const sum = m.subscapular + m.triceps + m.supraspinale;
    const factor = sum * (170.18 / h);
    return -0.7182 + 0.1451 * factor - 0.00068 * Math.pow(factor, 2) + 0.0000014 * Math.pow(factor, 3);
  }

  function legacyMeso(m, h) {
    if (!m || !h) return 0;
    return (
      0.858 * m.dm_elbow +
      0.601 * m.dm_knee +
      0.188 * (m.arm_flexed - m.triceps / 10) +
      0.161 * (m.calf - m.medial_calf / 10) -
      h * 0.131 +
      4.5
    );
  }

  function legacyPonderal(h, w) {
    if (!h || !w) return 0;
    return h / Math.pow(w, 1 / 3);
  }

  function legacyEcto(pIndex) {
    if (!pIndex) return 0;
    return pIndex > 40.75 ? pIndex * 0.732 - 28.58 : pIndex * 0.463 - 17.63;
  }

  const pInd = legacyPonderal(height, weight);
  const endo = legacyEndo(measurement, height);
  const meso = legacyMeso(measurement, height);
  const ecto = legacyEcto(pInd);

  return {
    endomorph: endo,
    mesomorph: meso,
    ectomorph: ecto,
    resultX: ecto - endo,
    resultY: 2 * meso - (ecto + endo),
    imc: weight && height ? weight / (((height / 100) * height) / 100) : 0,
    faulknerFatPercentage: legacyFaulkner(measurement, gender),
    parizcovaFatPercentage: legacyParizcova(measurement),
    yhaszFatPercentage: legacyYhasz(measurement, gender),
  };
}

describe('Differential & Metamorphic Testing: Legacy vs Upgraded Systems', () => {
  // Differential Test 1: Mathematical Equivalence on Canonical Inputs (2,000 iterations)
  it('DIFFERENTIAL 1: Upgraded engine is mathematically identical to legacy engine on valid canonical inputs', () => {
    const report = checkProperty({
      name: 'Calculation Engine Differential Equivalence',
      iterations: 2000,
      seed: 0xd1ffe4, // 'DIFF'
      generator: (prng) => {
        return () => {
          // Generate strictly valid legacy input where both systems are expected to operate
          const height = Number((prng.nextFloat() * 50 + 150).toFixed(1)); // 150 - 200 cm
          const weight = Number((prng.nextFloat() * 50 + 50).toFixed(1));  // 50 - 100 kg
          const gender = prng.nextBool();

          // Canonical legacy measurement payload with all bare keys populated
          const legacyMeasurement = {
            subscapular: Number((prng.nextFloat() * 20 + 8).toFixed(1)),
            triceps: Number((prng.nextFloat() * 20 + 8).toFixed(1)),
            biceps: Number((prng.nextFloat() * 15 + 4).toFixed(1)),
            iliac_crest: Number((prng.nextFloat() * 25 + 10).toFixed(1)),
            supraspinale: Number((prng.nextFloat() * 20 + 7).toFixed(1)),
            abdominal: Number((prng.nextFloat() * 30 + 10).toFixed(1)),
            front_thigh: Number((prng.nextFloat() * 30 + 10).toFixed(1)),
            medial_calf: Number((prng.nextFloat() * 20 + 6).toFixed(1)),
            dm_elbow: Number((prng.nextFloat() * 4 + 6).toFixed(1)),
            dm_knee: Number((prng.nextFloat() * 5 + 8).toFixed(1)),
            arm_flexed: Number((prng.nextFloat() * 15 + 28).toFixed(1)),
            calf: Number((prng.nextFloat() * 15 + 32).toFixed(1)),
          };

          return { legacyMeasurement, height, weight, gender };
        };
      },
      predicate: ({ legacyMeasurement, height, weight, gender }) => {
        const legacyRes = legacyGenerateResults(legacyMeasurement, height, weight, gender);
        const modernRes = modernGenerateResults(legacyMeasurement, height, weight, gender);

        const epsilon = 1e-6;
        const metricsToCompare = [
          'endomorph',
          'mesomorph',
          'ectomorph',
          'resultX',
          'resultY',
          'imc',
          'faulknerFatPercentage',
          'parizcovaFatPercentage',
          'yhaszFatPercentage',
        ];

        for (const metric of metricsToCompare) {
          const lVal = legacyRes[metric];
          const mVal = modernRes[metric];

          if (lVal === null && mVal === null) continue;

          const diff = Math.abs(lVal - mVal);
          if (diff > epsilon) {
            throw new Error(
              `Differential drift on metric "${metric}": Legacy=${lVal}, Modern=${mVal}, diff=${diff}`
            );
          }
        }
        return true;
      },
    });

    expect(report.passed).toBe(true);
  });

  // Differential Test 2: Resiliency on Modern Hasura Schema & Sparse Inputs (2,000 iterations)
  it('DIFFERENTIAL 2: Upgraded engine successfully handles modern plg_* keys and partial data where legacy yields NaN', () => {
    const report = checkProperty({
      name: 'Modern Schema Resilience vs Legacy Fragility',
      iterations: 2000,
      seed: 0x53434845, // 'SCHE'
      generator: (prng) => {
        const gen = new ArbitraryGenerators(prng);
        return () => {
          // Modern Hasura payload using plg_*, prm_*, dm_*
          const modernMeasurement = gen.measurement({ useModernKeys: true });
          const height = gen.height();
          const weight = gen.weight();
          const gender = prng.nextBool();
          return { modernMeasurement, height, weight, gender };
        };
      },
      predicate: ({ modernMeasurement, height, weight, gender }) => {
        const legacyRes = legacyGenerateResults(modernMeasurement, height, weight, gender);
        const modernRes = modernGenerateResults(modernMeasurement, height, weight, gender);

        // Legacy engine fails when plg_* keys are supplied instead of bare keys
        // (produces NaN on mesomorph, faulkner, parizcova, etc.)
        const legacyHasNaN =
          Number.isNaN(legacyRes.mesomorph) ||
          Number.isNaN(legacyRes.faulknerFatPercentage) ||
          Number.isNaN(legacyRes.resultX);

        // Modern engine MUST NEVER produce NaN
        const modernHasNaN =
          Number.isNaN(modernRes.mesomorph) ||
          Number.isNaN(modernRes.faulknerFatPercentage) ||
          Number.isNaN(modernRes.resultX);

        if (modernHasNaN) {
          throw new Error('Modern engine unexpectedly produced NaN on modern Hasura input!');
        }

        // When legacy failed, verify modern recovered gracefully
        if (legacyHasNaN) {
          expect(Number.isFinite(modernRes.resultX)).toBe(true);
          expect(Number.isFinite(modernRes.resultY)).toBe(true);
        }

        return true;
      },
    });

    expect(report.passed).toBe(true);
  });

  // Differential Test 3: Authentication & Security Matrix Comparison (1,000 iterations)
  it('DIFFERENTIAL 3: Modern authProvider enforces strict RBAC security whereas legacy byPassAuthProvider allowed open access', async () => {
    const prng = new DeterministicPRNG(0x41555448); // 'AUTH'
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const randomUsername = `user_${prng.nextInt(1, 99999)}@test.com`;
      const randomPassword = `pass_${prng.nextInt(1000, 9999)}`;
      const emptyPassword = '';
      const spoofedAdmin = prng.nextBool() ? 'admin' : randomUsername;

      // 1. Test checkAuth behavior with empty localStorage
      localStorage.clear();

      // Legacy byPassAuthProvider ALWAYS resolved (allowed unauthenticated callers!)
      await expect(byPassAuthProvider.checkAuth()).resolves.toBeUndefined();

      // Modern authProvider STRICTLY REJECTS unauthenticated sessions
      await expect(authProvider.checkAuth()).rejects.toBeUndefined();

      // 2. Test getPermissions behavior without session
      const legacyPerms = await byPassAuthProvider.getPermissions();
      const modernPerms = await authProvider.getPermissions();

      // Legacy unconditionally granted full admin rights!
      expect(legacyPerms).toEqual({ role: 'admin' });
      // Modern returns null (no permissions for unauthorized guest)
      expect(modernPerms).toBeNull();

      // 3. Test invalid login attempts
      // Legacy login unconditionally resolved for ANY credentials (even empty!)
      await expect(byPassAuthProvider.login({ username: randomUsername, password: emptyPassword })).resolves.toBeUndefined();

      // Modern login strictly rejects empty passwords or random non-admin credentials without valid DB token
      await expect(
        authProvider.login({ username: randomUsername, password: emptyPassword })
      ).rejects.toThrow();
    }
  });
});
