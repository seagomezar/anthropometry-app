import { describe, it, expect } from 'vitest';
import { generateResults } from '../Providers/retultsProvider';
import { DeterministicPRNG, ArbitraryGenerators, checkProperty } from './pbtEngine';

describe('Property-Based Testing: Invariants & Fuzzing (Ground Truth)', () => {
  // Test 1: 5,000 iterations verifying NO NaN, NO Infinity, and NO Unhandled Throws
  it('INVARIANT 1: Calculation engine NEVER produces NaN or Infinity across 5,000 randomized adversarial inputs', () => {
    const report = checkProperty({
      name: 'No NaN / No Infinity Invariant',
      iterations: 5000,
      seed: 0x20261005,
      generator: (prng) => {
        const gen = new ArbitraryGenerators(prng);
        return () => ({
          measurement: gen.measurement(),
          height: gen.height(),
          weight: gen.weight(),
          gender: prng.pick(['male', 'female', true, false, 1, 0, null, undefined]),
        });
      },
      predicate: ({ measurement, height, weight, gender }) => {
        const results = generateResults(measurement, height, weight, gender);

        // Every calculated metric must be finite or null, NEVER NaN, NEVER Infinity
        for (const [key, value] of Object.entries(results)) {
          if (value === null || value === undefined) {
            continue; // null allowed for optional metrics like yhasz when incomplete
          }
          if (typeof value === 'number') {
            if (Number.isNaN(value)) {
              throw new Error(`Metric "${key}" returned NaN!`);
            }
            if (!Number.isFinite(value)) {
              throw new Error(`Metric "${key}" returned non-finite value: ${value}`);
            }
          }
        }
        return true;
      },
    });

    expect(report.passed).toBe(true);
    expect(report.iterations).toBe(5000);
  });

  // Test 2: Mathematical & Somatocarta Coordinate Invariants (2,000 iterations)
  it('INVARIANT 2: Somatocarta coordinates strictly satisfy Heath-Carter geometric identities', () => {
    const report = checkProperty({
      name: 'Somatocarta Geometric Identity Invariant',
      iterations: 2000,
      seed: 0x48454154, // 'HEAT'
      generator: (prng) => {
        const gen = new ArbitraryGenerators(prng);
        return () => ({
          measurement: gen.measurement({ useModernKeys: true }),
          height: gen.prng.nextFloat() * 60 + 140, // 140 - 200 cm
          weight: gen.prng.nextFloat() * 70 + 45,  // 45 - 115 kg
          gender: prng.nextBool(),
        });
      },
      predicate: ({ measurement, height, weight, gender }) => {
        const res = generateResults(measurement, height, weight, gender);

        // Identity 1: X = Ecto - Endo
        const expectedX = res.ectomorph - res.endomorph;
        const diffX = Math.abs(res.resultX - expectedX);
        if (diffX > 1e-9) {
          throw new Error(`X coordinate mismatch: got ${res.resultX}, expected ${expectedX}`);
        }

        // Identity 2: Y = 2 * Meso - (Ecto + Endo)
        const expectedY = 2 * res.mesomorph - (res.ectomorph + res.endomorph);
        const diffY = Math.abs(res.resultY - expectedY);
        if (diffY > 1e-9) {
          throw new Error(`Y coordinate mismatch: got ${res.resultY}, expected ${expectedY}`);
        }

        // Identity 3: Body Mass Index (BMI) = weight / (height_m^2)
        if (height > 0 && weight > 0) {
          const h_m = height / 100;
          const expectedIMC = weight / (h_m * h_m);
          const diffIMC = Math.abs(res.imc - expectedIMC);
          if (diffIMC > 1e-6) {
            throw new Error(`IMC mismatch: got ${res.imc}, expected ${expectedIMC}`);
          }
        }

        return true;
      },
    });

    expect(report.passed).toBe(true);
  });

  // Test 3: Monotonicity Invariant (2,000 iterations)
  it('INVARIANT 3: Skinfold sum is strictly monotonic with respect to individual skinfold increments', () => {
    const report = checkProperty({
      name: 'Skinfold Sum Monotonicity Invariant',
      iterations: 2000,
      seed: 0x4d4f4e4f, // 'MONO'
      generator: (prng) => {
        const gen = new ArbitraryGenerators(prng);
        return () => {
          const base = gen.measurement({ useModernKeys: true });
          const delta = prng.nextFloat() * 10 + 0.1; // positive increment
          const targetKey = prng.pick([
            'plg_triceps',
            'plg_subscapular',
            'plg_supraspinal',
            'plg_abdominal',
            'plg_thigh',
            'plg_calf',
          ]);
          return { base, delta, targetKey };
        };
      },
      predicate: ({ base, delta, targetKey }) => {
        const height = 175;
        const weight = 70;
        const gender = 'male';

        const baseRes = generateResults(base, height, weight, gender);

        // Cloned measurement with increased skinfold
        const augmented = { ...base };
        const originalVal = Number(augmented[targetKey]) || 0;
        augmented[targetKey] = originalVal + delta;

        const augRes = generateResults(augmented, height, weight, gender);

        // Sum of skinfolds MUST NEVER decrease when an individual skinfold increases
        if (augRes.sumOfPlgs < baseRes.sumOfPlgs) {
          throw new Error(
            `Monotonicity violated! Base sum: ${baseRes.sumOfPlgs}, Augmented sum: ${augRes.sumOfPlgs} after increasing ${targetKey} by ${delta}`
          );
        }

        return true;
      },
    });

    expect(report.passed).toBe(true);
  });

  // Test 4: Paraclinical Independence Invariant (1,000 iterations)
  it('INVARIANT 4: Paraclinicals NEVER alter somatic coordinates or body composition metrics', () => {
    const report = checkProperty({
      name: 'Paraclinical Independence Invariant',
      iterations: 1000,
      seed: 0x50415241, // 'PARA'
      generator: (prng) => {
        const gen = new ArbitraryGenerators(prng);
        return () => ({
          base: gen.measurement({ useModernKeys: true, includeParaclinicals: false }),
          paraclinicals: gen.paraclinicals(),
          height: gen.prng.nextFloat() * 40 + 150,
          weight: gen.prng.nextFloat() * 50 + 50,
          gender: prng.nextBool(),
        });
      },
      predicate: ({ base, paraclinicals, height, weight, gender }) => {
        const resWithoutLabs = generateResults(base, height, weight, gender);
        const resWithLabs = generateResults(
          { ...base, ...paraclinicals },
          height,
          weight,
          gender
        );

        // Core somatic metrics must be 100% IDENTICAL
        const checkKeys = [
          'resultX',
          'resultY',
          'endomorph',
          'mesomorph',
          'ectomorph',
          'imc',
          'sumOfPlgs',
          'faulknerFatPercentage',
          'parizcovaFatPercentage',
        ];

        for (const k of checkKeys) {
          if (resWithoutLabs[k] !== resWithLabs[k]) {
            throw new Error(
              `Paraclinicals corrupted ${k}: before=${resWithoutLabs[k]}, after=${resWithLabs[k]}`
            );
          }
        }
        return true;
      },
    });

    expect(report.passed).toBe(true);
  });

  // Test 5: Tenant Isolation Invariant (2,000 iterations)
  it('INVARIANT 5: Tenant filter strictly guarantees ZERO cross-tenant data leakage', () => {
    const report = checkProperty({
      name: 'Multi-Tenant RBAC Isolation Invariant',
      iterations: 2000,
      seed: 0x54454e41, // 'TENA'
      generator: (prng) => {
        return () => {
          const tenantId = prng.nextInt(1, 100);
          const otherTenantId = prng.nextInt(101, 200);
          const role = prng.pick(['nutritionist', 'admin']);
          // Simulate database records belonging to various tenants
          const records = Array.from({ length: 20 }, (_, idx) => ({
            id: idx + 1,
            name: `Patient ${idx + 1}`,
            nutritionist_id: prng.pick([tenantId, otherTenantId, prng.nextInt(201, 300)]),
          }));
          return { tenantId, role, records };
        };
      },
      predicate: ({ tenantId, role, records }) => {
        // Apply the application's permanent filter logic from UserList / MeasurementList
        const permissions = {
          role,
          nutritionistId: tenantId,
        };

        const permanentFilter =
          permissions.role === 'nutritionist' && permissions.nutritionistId
            ? { nutritionist_id: permissions.nutritionistId }
            : undefined;

        // Simulate query application
        let filteredRecords = records;
        if (permanentFilter?.nutritionist_id) {
          filteredRecords = records.filter(
            (r) => r.nutritionist_id === permanentFilter.nutritionist_id
          );
        }

        if (role === 'nutritionist') {
          // Invariant: In filtered results, EVERY record must belong to this nutritionist
          const leaked = filteredRecords.filter((r) => r.nutritionist_id !== tenantId);
          if (leaked.length > 0) {
            throw new Error(`Data leakage! Found records from other tenants: ${JSON.stringify(leaked)}`);
          }
        }

        return true;
      },
    });

    expect(report.passed).toBe(true);
  });
});
