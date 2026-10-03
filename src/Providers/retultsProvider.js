const n = (val) => {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
};

function yhaszFatPercentage(measurement, gender) {
  if (!measurement) return null;
  const plg_subscapular = measurement.plg_subscapular ?? measurement.subscapular;
  const plg_triceps = measurement.plg_triceps ?? measurement.triceps;
  const plg_supraspinal = measurement.plg_supraspinal ?? measurement.supraspinale;
  const plg_abdominal = measurement.plg_abdominal ?? measurement.abdominal;
  const plg_thigh = measurement.plg_thigh ?? measurement.front_thigh;
  const plg_calf = measurement.plg_calf ?? measurement.medial_calf;

  // Check for edge cases
  if (
    !plg_subscapular ||
    !plg_triceps ||
    !plg_supraspinal ||
    !plg_abdominal ||
    !plg_thigh ||
    !plg_calf
  )
    return null;

  // Calculate the sum of all measurements
  const sumOfMeasurements =
    n(plg_subscapular) +
    n(plg_triceps) +
    n(plg_supraspinal) +
    n(plg_abdominal) +
    n(plg_thigh) +
    n(plg_calf);

  // Calculate fat percentage based on gender
  const fatPercentage = gender
    ? 0.1051 * sumOfMeasurements + 2.585
    : 0.1548 * sumOfMeasurements + 3.58;
  return fatPercentage;
}

function faulknerFatPercentage(measurement, gender) {
  if (!measurement) return 0;
  const plg_subscapular = measurement.plg_subscapular ?? measurement.subscapular;
  const plg_triceps = measurement.plg_triceps ?? measurement.triceps;
  const plg_suprailiac = measurement.plg_suprailiac ?? measurement.iliac_crest;
  const plg_abdominal = measurement.plg_abdominal ?? measurement.abdominal;

  // Calculate the sum of all measurements
  const sumOfMeasurements =
    n(plg_subscapular) + n(plg_triceps) + n(plg_suprailiac) + n(plg_abdominal);

  // Calculate fat percentage based on gender
  const fatPercentage = gender
    ? 0.153 * sumOfMeasurements + 5.783
    : 0.213 * sumOfMeasurements + 7.9;
  return fatPercentage;
}

function parizcovaFatPercentage(measurement) {
  if (!measurement) return 0;
  const plg_subscapular = measurement.plg_subscapular ?? measurement.subscapular;
  const plg_triceps = measurement.plg_triceps ?? measurement.triceps;
  const plg_suprailiac = measurement.plg_suprailiac ?? measurement.iliac_crest;
  const plg_bicep = measurement.plg_bicep ?? measurement.biceps;

  const fatPercentage =
    2.745 +
    0.0008 * n(plg_triceps) +
    0.002 * n(plg_subscapular) +
    0.637 * n(plg_suprailiac) +
    0.809 * n(plg_bicep);
  return fatPercentage;
}

function sumaPlieguesEndo(measurement) {
  if (!measurement) return 0;
  const plg_subscapular = measurement.plg_subscapular ?? measurement.subscapular;
  const plg_triceps = measurement.plg_triceps ?? measurement.triceps;
  const plg_supraspinal = measurement.plg_supraspinal ?? measurement.supraspinale;

  const sumOfMeasurements =
    n(plg_subscapular) + n(plg_triceps) + n(plg_supraspinal);
  return sumOfMeasurements;
}

function endoFactor(measurement, height) {
  const h = n(height);
  if (!h) return 0;
  const endoFactor =
    sumaPlieguesEndo(measurement) * (170.18 / h);
  return endoFactor;
}

function ponderalIndex(height, weight) {
  const h = n(height);
  const w = n(weight);
  if (!h || !w) return 0;
  const ponderalIndex = h / Math.pow(w, 1 / 3);
  return ponderalIndex;
}

function endomorph(measurement, height) {
  const factor = endoFactor(measurement, height);
  if (!factor) return 0;
  const endomorph =
    -0.7182 +
    0.1451 * factor -
    0.00068 * Math.pow(factor, 2) +
    0.0000014 * Math.pow(factor, 3);
  return endomorph;
}

function mesomorph(measurement, height) {
  if (!measurement) return 0;
  const dm_elbow = n(measurement.dm_elbow);
  const dm_knee = n(measurement.dm_knee);
  const plg_triceps = n(measurement.plg_triceps ?? measurement.triceps);
  const plg_calf = n(measurement.plg_calf ?? measurement.medial_calf);
  const prm_calf = n(measurement.prm_calf ?? measurement.calf);
  const prm_arm_contracted = n(measurement.prm_arm_contracted ?? measurement.arm_flexed);
  const h = n(height);
  if (!h) return 0;
  const mesomorph =
    0.858 * dm_elbow +
    0.601 * dm_knee +
    0.188 * (prm_arm_contracted - plg_triceps / 10) +
    0.161 * (prm_calf - plg_calf / 10) -
    h * 0.131 +
    4.5;
  return mesomorph;
}

function ectomorph(ponderalIndex) {
  const pIndex = n(ponderalIndex);
  if (!pIndex) return 0;
  let ectomorph = 0;
  if (pIndex > 40.75) {
    ectomorph = pIndex * 0.732 - 28.58;
  } else {
    ectomorph = pIndex * 0.463 - 17.63;
  }
  return ectomorph;
}

function resultX(ectomorph, endomorph) {
  return n(ectomorph) - n(endomorph);
}

function resultY(ectomorph, endomorph, mesomorph) {
  return 2 * n(mesomorph) - (n(ectomorph) + n(endomorph));
}

function imc(weight, height) {
  const w = n(weight);
  const h = n(height);
  if (!w || !h) return 0;
  const imc = w / (((h / 100) * h) / 100);
  return imc;
}

function activeMass(measurement, weight) {
  const w = n(weight);
  const activeMass =
    w - (parizcovaFatPercentage(measurement) * w) / 100;
  return activeMass;
}

function iaks(measurement, height, weight) {
  const h = n(height);
  const w = n(weight);
  if (!h || !w) return 0;
  const iaks =
    (activeMass(measurement, w) * 100000) /
    (h * h * h);
  return iaks;
}

function complexion(measurement, height) {
  const h = n(height);
  const prm_wrist = n(measurement?.prm_wrist ?? measurement?.wrist);
  if (prm_wrist && h) {
    return h / prm_wrist;
  } else {
    return 0;
  }
}

function raizPT(weight, height) {
  const w = n(weight);
  const h = n(height);
  if (!w || !h) return 0;
  const raizPt = Math.sqrt(w / (h / 100));
  return raizPt;
}

function conicIndex(measurement, weight, height) {
  const prm_waist = n(measurement?.prm_waist ?? measurement?.waist);
  const rPT = raizPT(weight, height);
  if (!rPT || !prm_waist) return 0;
  const conicIndex =
    prm_waist / 100 / (0.109 * rPT);
  return conicIndex;
}

function sumOfPlgs(measurement) {
  if (!measurement) return 0;
  const plg_subscapular = measurement.plg_subscapular ?? measurement.subscapular;
  const plg_triceps = measurement.plg_triceps ?? measurement.triceps;
  const plg_supraspinal = measurement.plg_supraspinal ?? measurement.supraspinale;
  const plg_abdominal = measurement.plg_abdominal ?? measurement.abdominal;
  const plg_thigh = measurement.plg_thigh ?? measurement.front_thigh;
  const plg_calf = measurement.plg_calf ?? measurement.medial_calf;

  const sumOfPlgs =
    n(plg_subscapular) +
    n(plg_triceps) +
    n(plg_supraspinal) +
    n(plg_abdominal) +
    n(plg_thigh) +
    n(plg_calf);
  return sumOfPlgs;
}

function fatWeight(measurement, weight, gender) {
  const w = n(weight);
  const fatPercentage = yhaszFatPercentage(measurement, gender) || 1;
  const fatWeight = (fatPercentage * w) / 100;
  return fatWeight;
}

function freeFatWeight(measurement, weight, gender) {
  const w = n(weight);
  const freeFatWeight =
    w - fatWeight(measurement, w, gender);
  return freeFatWeight;
}

function residualWeight(weight, gender) {
  const w = n(weight);
  if (!w) return 0;
  let residualWeight;
  // Hombre
  if (gender) {
    residualWeight = w * 0.209;
  } else {
    residualWeight = w * 0.241;
  }
  return residualWeight;
}

function desiredIMC(gender) {
  if (gender) {
    return 20;
  } else {
    return 23;
  }
}

function desiredWeight(height, gender) {
  const h = n(height);
  if (!h) return 0;
  const dIMC = desiredIMC(gender);
  const desiredWeight = dIMC * ((h / 100) * (h / 100));
  return desiredWeight;
}

function desiredFatPercentage(gender) {
  if (gender) {
    return 7.5;
  } else {
    return 7.5;
  }
}

function desiredFat2MethodPercentage(measurement, weight, gender) {
  const plg = freeFatWeight(measurement, weight, gender);
  const desiredFat2MethodPercentage =
    plg / (1 - desiredFatPercentage(gender) / 100);
  return desiredFat2MethodPercentage;
}

export function generateResults(measurement, height, weight, gender) {
  const results = {
    endomorph: endomorph(measurement, height),
    mesomorph: mesomorph(measurement, height),
    ectomorph: ectomorph(ponderalIndex(height, weight)),
    resultX: resultX(
      ectomorph(ponderalIndex(height, weight)),
      endomorph(measurement, height)
    ),
    resultY: resultY(
      ectomorph(ponderalIndex(height, weight)),
      endomorph(measurement, height),
      mesomorph(measurement, height)
    ),
    imc: imc(weight, height),
    desiredIMC: desiredIMC(gender),
    iaks: iaks(measurement, height, weight),
    complexion: complexion(measurement, height),
    raizPT: raizPT(weight, height),
    conicIndex: conicIndex(measurement, weight, height),
    sumOfPlgs: sumOfPlgs(measurement),
    sumaPlieguesEndo: sumaPlieguesEndo(measurement),
    endoFactor: endoFactor(measurement, height),
    yhaszFatPercentage: yhaszFatPercentage(measurement, gender),
    ponderalIndex: ponderalIndex(height, weight),
    faulknerFatPercentage: faulknerFatPercentage(measurement, gender),
    parizcovaFatPercentage: parizcovaFatPercentage(measurement),
    fatWeight: fatWeight(measurement, weight, gender),
    freeFatWeight: freeFatWeight(measurement, weight, gender),
    activeMass: activeMass(measurement, weight),
    residualWeight: residualWeight(weight, gender),
    desiredWeight: desiredWeight(height, gender),
    desiredFat2MethodPercentage: desiredFat2MethodPercentage(
      measurement,
      weight,
      gender
    ),
  };
  return results;
}
