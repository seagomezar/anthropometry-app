/**
 * Ultra-fast deterministic Pseudo-Random Number Generator (PRNG)
 * Based on Mulberry32 algorithm.
 * Guarantees 100% reproducible test runs across platforms.
 */
export class DeterministicPRNG {
  constructor(seed = 0x1337cafe) {
    this.initialSeed = seed >>> 0;
    this.seed = this.initialSeed;
  }

  reset() {
    this.seed = this.initialSeed;
  }

  // Returns pseudo-random float in [0, 1)
  nextFloat() {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Returns integer in [min, max] inclusive
  nextInt(min, max) {
    return Math.floor(this.nextFloat() * (max - min + 1)) + min;
  }

  // Pick random element from array
  pick(array) {
    if (!array || array.length === 0) return undefined;
    return array[this.nextInt(0, array.length - 1)];
  }

  // Boolean with given probability of true
  nextBool(prob = 0.5) {
    return this.nextFloat() < prob;
  }
}

/**
 * Arbitrary Generators for Anthropometry Domain
 */
export class ArbitraryGenerators {
  constructor(prng) {
    this.prng = prng;
  }

  // Generates realistic, extreme, or adversarial heights (cm)
  height() {
    const type = this.prng.pick(['normal', 'extreme_short', 'extreme_tall', 'zero', 'negative', 'string']);
    switch (type) {
      case 'normal':
        return Number((this.prng.nextFloat() * 80 + 130).toFixed(1)); // 130 - 210 cm
      case 'extreme_short':
        return Number((this.prng.nextFloat() * 40 + 40).toFixed(1)); // 40 - 80 cm
      case 'extreme_tall':
        return Number((this.prng.nextFloat() * 60 + 210).toFixed(1)); // 210 - 270 cm
      case 'zero':
        return 0;
      case 'negative':
        return -Number((this.prng.nextFloat() * 100 + 10).toFixed(1));
      case 'string':
        return `${Number((this.prng.nextFloat() * 60 + 140).toFixed(1))}`;
      default:
        return 175.0;
    }
  }

  // Generates weights (kg)
  weight() {
    const type = this.prng.pick(['normal', 'light', 'heavy', 'zero', 'negative', 'string']);
    switch (type) {
      case 'normal':
        return Number((this.prng.nextFloat() * 60 + 45).toFixed(1)); // 45 - 105 kg
      case 'light':
        return Number((this.prng.nextFloat() * 20 + 20).toFixed(1)); // 20 - 40 kg
      case 'heavy':
        return Number((this.prng.nextFloat() * 120 + 120).toFixed(1)); // 120 - 240 kg
      case 'zero':
        return 0;
      case 'negative':
        return -Number((this.prng.nextFloat() * 50).toFixed(1));
      case 'string':
        return `${Number((this.prng.nextFloat() * 50 + 50).toFixed(1))}`;
      default:
        return 70.0;
    }
  }

  // Generates skinfolds (mm) with potential nulls, partial omissions, strings
  skinfold() {
    const type = this.prng.pick(['valid', 'zero', 'null', 'undefined', 'string', 'high']);
    switch (type) {
      case 'valid':
        return Number((this.prng.nextFloat() * 35 + 3).toFixed(1)); // 3 - 38 mm
      case 'zero':
        return 0;
      case 'null':
        return null;
      case 'undefined':
        return undefined;
      case 'string':
        return `${Number((this.prng.nextFloat() * 30 + 5).toFixed(1))}`;
      case 'high':
        return Number((this.prng.nextFloat() * 60 + 40).toFixed(1)); // 40 - 100 mm
      default:
        return 10.0;
    }
  }

  // Generates bone diameters (cm)
  diameter() {
    const type = this.prng.pick(['valid', 'zero', 'null', 'undefined', 'string']);
    switch (type) {
      case 'valid':
        return Number((this.prng.nextFloat() * 8 + 5).toFixed(1)); // 5 - 13 cm
      case 'zero':
        return 0;
      case 'null':
        return null;
      case 'undefined':
        return undefined;
      case 'string':
        return `${Number((this.prng.nextFloat() * 6 + 5).toFixed(1))}`;
      default:
        return 7.0;
    }
  }

  // Generates girth perimeters (cm)
  perimeter() {
    const type = this.prng.pick(['valid', 'zero', 'null', 'undefined', 'string']);
    switch (type) {
      case 'valid':
        return Number((this.prng.nextFloat() * 70 + 20).toFixed(1)); // 20 - 90 cm
      case 'zero':
        return 0;
      case 'null':
        return null;
      case 'undefined':
        return undefined;
      case 'string':
        return `${Number((this.prng.nextFloat() * 50 + 30).toFixed(1))}`;
      default:
        return 30.0;
    }
  }

  // Generates paraclinical lab values
  paraclinicals() {
    return {
      blood_pressure: this.prng.pick(['120/80', '135/85', '110/70', '140/90', '', null, undefined]),
      glucose: this.prng.pick([85, 95, 110, 140, 0, null, undefined, '92']),
      hba1c: this.prng.pick([5.2, 5.7, 6.5, 7.1, 0, null, undefined, '5.4']),
      cholesterol_total: this.prng.pick([170, 210, 240, null, undefined, '195']),
      cholesterol_hdl: this.prng.pick([45, 55, 65, null, undefined]),
      cholesterol_ldl: this.prng.pick([90, 130, 160, null, undefined]),
      triglycerides: this.prng.pick([110, 150, 220, 0, null, undefined, '130']),
      hemoglobin: this.prng.pick([13.5, 15.0, 12.2, null, undefined]),
      paraclinicals_notes: this.prng.pick(['Perfil lipídico de control', 'Ayuno 12h', '', null, undefined]),
    };
  }

  // Generates full measurement payload with dual key formats (modern plg_* vs legacy bare keys)
  measurement(options = {}) {
    const useModernKeys = options.useModernKeys ?? this.prng.nextBool(0.7);
    const m = {
      id: this.prng.nextInt(1, 10000),
      user_id: this.prng.nextInt(1, 5000),
      nutritionist_id: options.nutritionist_id ?? this.prng.nextInt(1, 10),
      control: this.prng.nextInt(1, 20),
      evaluation_date: '2026-10-05',
      height: this.height(),
      weight: this.weight(),
      fitness_level: this.prng.nextInt(0, 3),
      notes: this.prng.pick(['Control regular', 'Paciente pretemporada', 'no', null]),
    };

    if (useModernKeys) {
      m.plg_triceps = this.skinfold();
      m.plg_subscapular = this.skinfold();
      m.plg_bicep = this.skinfold();
      m.plg_suprailiac = this.skinfold();
      m.plg_supraspinal = this.skinfold();
      m.plg_abdominal = this.skinfold();
      m.plg_thigh = this.skinfold();
      m.plg_calf = this.skinfold();
      m.plg_chest = this.skinfold();
      m.plg_armpit = this.skinfold();

      m.prm_arm = this.perimeter();
      m.prm_arm_contracted = this.perimeter();
      m.prm_waist = this.perimeter();
      m.prm_hip = this.perimeter();
      m.prm_calf = this.perimeter();
      m.prm_thigh = this.perimeter();
      m.prm_chest = this.perimeter();

      m.dm_elbow = this.diameter();
      m.dm_knee = this.diameter();
      m.dm_wrist = this.diameter();
    } else {
      m.triceps = this.skinfold();
      m.subscapular = this.skinfold();
      m.biceps = this.skinfold();
      m.iliac_crest = this.skinfold();
      m.supraspinale = this.skinfold();
      m.abdominal = this.skinfold();
      m.front_thigh = this.skinfold();
      m.medial_calf = this.skinfold();

      m.arm = this.perimeter();
      m.arm_flexed = this.perimeter();
      m.waist = this.perimeter();
      m.hip = this.perimeter();
      m.calf = this.perimeter();

      m.dm_elbow = this.diameter();
      m.dm_knee = this.diameter();
      m.dm_wrist = this.diameter();
    }

    if (options.includeParaclinicals ?? this.prng.nextBool(0.5)) {
      Object.assign(m, this.paraclinicals());
    }

    return m;
  }
}

/**
 * Property-based test runner that executes a property predicate across N iterations.
 */
export function checkProperty({
  name,
  iterations = 1000,
  seed = 0x20261005,
  generator,
  predicate,
}) {
  const prng = new DeterministicPRNG(seed);
  const gen = generator(prng);

  for (let i = 0; i < iterations; i++) {
    const input = gen(i);
    try {
      const result = predicate(input, i);
      if (result === false) {
        throw new Error(`Property violated on iteration ${i}`);
      }
    } catch (err) {
      throw new Error(
        `[Property: "${name}"] FAILED on iteration ${i} with seed 0x${seed.toString(16)}: ${err.message}\nInput: ${JSON.stringify(input, null, 2)}`
      );
    }
  }

  return { name, iterations, seed, passed: true };
}
