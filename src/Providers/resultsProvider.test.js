import { generateResults } from './retultsProvider';

describe('generateResults', () => {
  it('should return the correct results for a given measurement, height, weight, and gender', () => {
    const measurement = {
      control: 1,
      created_at: '2022-12-21T19:00:00.361419+00:00',
      creatinine: '0',
      dm_elbow: 7.1,
      dm_knee: 10.5,
      dm_wrist: 5.6,
      evaluation_date: '2022-02-14',
      fitness_level: 0,
      height: 176.6,
      id: 46,
      notes: 'no',
      nutritionist_id: 1,
      plg_abdominal: 18.4,
      plg_armpit: 0,
      plg_bicep: 5.6,
      plg_calf: 8.4,
      plg_chest: 0,
      plg_subscapular: 10.8,
      plg_suprailiac: 15,
      plg_supraspinal: 12,
      plg_thigh: 18,
      plg_triceps: 15.4,
      prm_arm: 34,
      prm_arm_contracted: 34.8,
      prm_calf: 39,
      prm_chest: 0,
      prm_hip: 99,
      prm_thigh: 0,
      prm_waist: 84.5,
      referenced_somatotype_id: 26,
      t3_t4: '0',
      triglycerides: '0',
      updated_at: '2022-12-21T19:00:00.361419+00:00',
      uric_acid: '0',
      user_id: 166,
      weight: 80,
      x: -2.4,
      y: 7.1,
    };
    const height = 176.6;
    const weight = 80;
    const gender = 'male';

    const expected = {
      endomorph: 3.7715057770957903,
      mesomorph: 6.164339999999999,
      ectomorph: 1.4211879213862169,
      resultX: -2.3503178557095734,
      resultY: 7.135986301517992,
      imc: 25.651253256105957,
      desiredIMC: 20,
      iaks: 1.207550612853105,
      complexion: 0,
      raizPT: 6.7305358813606455,
      conicIndex: 1.1518092637245472,
      sumOfPlgs: 83,
      sumaPlieguesEndo: 38.2,
      endoFactor: 36.81130237825595,
      yhaszFatPercentage: 11.3083,
      ponderalIndex: 40.98522940080084,
      faulknerFatPercentage: 14.901800000000001,
      parizcovaFatPercentage: 16.86432,
      fatWeight: 9.04664,
      freeFatWeight: 70.95336,
      activeMass: 66.508544,
      residualWeight: 16.72,
      desiredWeight: 62.375119999999995,
      desiredFat2MethodPercentage: 76.70633513513513,
    };

    expect(
      generateResults(measurement, height, weight, gender)
    ).toEqual(expected);
  });
});
