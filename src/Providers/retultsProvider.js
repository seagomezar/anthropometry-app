function yhaszFatPercentage(measurement, gender) {
  const {
    plg_subscapular,
    plg_triceps,
    plg_supraspinal,
    plg_abdominal,
    plg_thigh,
    plg_calf,
  } = measurement;

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
    plg_subscapular +
    plg_triceps +
    plg_supraspinal +
    plg_abdominal +
    plg_thigh +
    plg_calf;

  // Calculate fat percentage based on gender
  const fatPercentage = gender
    ? 0.1051 * sumOfMeasurements + 2.585
    : 0.1548 * sumOfMeasurements + 3.58;
  console.log({ yhaszFatPercentage: fatPercentage });
  return fatPercentage;
}

function faulknerFatPercentage(measurement, gender) {
  const {
    plg_subscapular,
    plg_triceps,
    plg_suprailiac,
    plg_abdominal,
  } = measurement;

  // Calculate the sum of all measurements
  const sumOfMeasurements =
    plg_subscapular + plg_triceps + plg_suprailiac + plg_abdominal;

  // Calculate fat percentage based on gender
  const fatPercentage = gender
    ? 0.153 * sumOfMeasurements + 5.783
    : 0.213 * sumOfMeasurements + 7.9;
  console.log({ faulknerFatPercentage: fatPercentage });
  return fatPercentage;
}

function parizcovaFatPercentage(measurement) {
  const { plg_subscapular, plg_triceps, plg_suprailiac, plg_bicep } =
    measurement;

  const fatPercentage =
    2.745 +
    0.0008 * plg_triceps +
    0.002 * plg_subscapular +
    0.637 * plg_suprailiac +
    0.809 * plg_bicep;
  console.log({ parizcovaFatPercentage: fatPercentage });
  return fatPercentage;
}

function sumaPlieguesEndo(measurement) {
  const { plg_subscapular, plg_triceps, plg_supraspinal } =
    measurement;

  // Calculate the sum of all measurements
  const sumOfMeasurements =
    plg_subscapular + plg_triceps + plg_supraspinal;
  console.log('sumaPlieguesEndo', sumOfMeasurements);
  return sumOfMeasurements;
}

function endoFactor(measurement, height) {
  const endoFactor =
    sumaPlieguesEndo(measurement) * (170.18 / height);
  console.log('endoFactor', endoFactor);
  return endoFactor;
}

function ponderalIndex(height, weight) {
  const ponderalIndex = height / Math.pow(weight, 1 / 3);
  console.log('ponderalIndex', ponderalIndex);
  return ponderalIndex;
}

function endomorph(measurement, height) {
  const factor = endoFactor(measurement, height);
  const endomorph =
    -0.7182 +
    0.1451 * factor -
    0.00068 * Math.pow(factor, 2) +
    0.0000014 * Math.pow(factor, 3);
  console.log({ endomorph });
  return endomorph;
}

function mesomorph(measurement, height) {
  const {
    dm_elbow,
    dm_knee,
    plg_triceps,
    plg_calf,
    prm_calf,
    prm_arm_contracted,
  } = measurement;
  const mesomorph =
    0.858 * dm_elbow +
    0.601 * dm_knee +
    0.188 * (prm_arm_contracted - plg_triceps / 10) +
    0.161 * (prm_calf - plg_calf / 10) -
    height * 0.131 +
    4.5;
  console.log({ mesomorph });
  return mesomorph;
}

function ectomorph(ponderalIndex) {
  let ectomorph = 0;
  if (ponderalIndex > 40.75) {
    ectomorph = ponderalIndex * 0.732 - 28.58;
  } else {
    ectomorph = ponderalIndex * 0.463 - 17.63;
  }
  console.log({ ectomorph });
  return ectomorph;
}

function resultX(ectomorph, endomorph) {
  const x = ectomorph - endomorph;
  console.log({ x });
  return x;
}

function resultY(ectomorph, endomorph, mesomorph) {
  const y = 2 * mesomorph - (ectomorph + endomorph);
  console.log({ y });
  return y;
}

function imc(weight, height) {
  const imc = weight / (((height / 100) * height) / 100);
  return imc;
}

function activeMass(measurement, weight) {
  const activeMass =
    weight - (parizcovaFatPercentage(measurement) * weight) / 100;
  console.log({ activeMass });
  return activeMass;
}

function iaks(measurement, height, weight) {
  const iaks =
    (activeMass(measurement, weight) * 100000) /
    (height * height * height);
  console.log({ iaks });
  return iaks;
}

function complexion(measurement, height) {
  const { prm_wrist } = measurement;
  if (prm_wrist) {
    const complexion = height / prm_wrist;
    console.log({ complexion });
    return complexion;
  } else {
    return 0;
  }
}

function raizPT(weight, height) {
  const raizPt = Math.sqrt(weight / (height / 100));
  console.log({ raizPt });
  return raizPt;
}

function conicIndex(measurement, weight, height) {
  const { prm_waist } = measurement;
  const conicIndex =
    prm_waist / 100 / (0.109 * raizPT(weight, height));
  return conicIndex;
}

function sumOfPlgs(measurement) {
  const {
    plg_subscapular,
    plg_triceps,
    plg_supraspinal,
    plg_abdominal,
    plg_thigh,
    plg_calf,
  } = measurement;
  const sumOfPlgs =
    plg_subscapular +
    plg_triceps +
    plg_supraspinal +
    plg_abdominal +
    plg_thigh +
    plg_calf;
  console.log({ sumOfPlgs });
  return sumOfPlgs;
}

function fatWeight(measurement, weight, gender) {
  const fatPercentage = yhaszFatPercentage(measurement, gender) || 1;
  console.log('% ', fatPercentage);
  const fatWeight = (fatPercentage * weight) / 100;
  console.log({ fatWeight });
  return fatWeight;
}

function freeFatWeight(measurement, weight, gender) {
  const freeFatWeight =
    weight - fatWeight(measurement, weight, gender);
  console.log({ freeFatWeight });
  return freeFatWeight;
}

function residualWeight(weight, gender) {
  let residualWeight;
  // Hombre
  if (gender) {
    residualWeight = weight * 0.209;
  } else {
    residualWeight = weight * 0.241;
  }
  console.log({ residualWeight });
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
  const dIMC = desiredIMC(gender);
  const desiredWeight = dIMC * ((height / 100) * (height / 100));
  console.log({ desiredWeight });
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
  console.log({ desiredFat2MethodPercentage });
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
  console.log({ results });
  return results;
}
