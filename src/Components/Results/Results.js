// La formula de Yuhasz para hombres es:  Porcentaje de Grasa Corporal (%) = (0.1051 x suma de los pliegues ) + 2.585
// y para mujeres es Porcentaje de Grasa Corporal (%) = (0.1548 x suma de los pliegues) + 3.580.
function yhaszFatPercentage(measurement, gender) {
	const {
	  plg_subscapular,
	  plg_triceps,
	  plg_supraspinal,
	  plg_abdominal,
	  plg_thigh,
	  plg_calf
	} = measurement;
  
	// Check for edge cases
	if (!plg_subscapular || !plg_triceps || !plg_supraspinal || !plg_abdominal || !plg_thigh || !plg_calf) return null;

	// Calculate the sum of all measurements
	const sumOfMeasurements = plg_subscapular + plg_triceps + plg_supraspinal + plg_abdominal + plg_thigh + plg_calf;
  
	// Calculate fat percentage based on gender
	const fatPercentage = gender ? (0.1051 * sumOfMeasurements) + 2.585 : (0.1548 * sumOfMeasurements) + 3.580;
	console.log({yhaszFatPercentage: fatPercentage}); 
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
	  const sumOfMeasurements = plg_subscapular + plg_triceps + plg_suprailiac + plg_abdominal;
	
	  // Calculate fat percentage based on gender
	  const fatPercentage = gender ? (0.153 * sumOfMeasurements) + 5.783 : (0.213 * sumOfMeasurements) + 7.9;
	  console.log({faulknerFatPercentage: fatPercentage}); 
	  return fatPercentage;
  }

  function parizcovaFatPercentage(measurement){
	const {
		plg_subscapular,
		plg_triceps,
		plg_suprailiac,
		plg_bicep
	  } = measurement;

	  const fatPercentage = (2.745+0.0008*plg_triceps+0.002*plg_subscapular+0.637*plg_suprailiac+0.809*plg_bicep)
	  console.log({parizcovaFatPercentage: fatPercentage}); 
	  return fatPercentage;
  }

  function sumaPlieguesEndo(measurement){
	const {
		plg_subscapular,
		plg_triceps,
		plg_supraspinal,
	  } = measurement;
  
	  // Calculate the sum of all measurements
	  const sumOfMeasurements = plg_subscapular + plg_triceps + plg_supraspinal;
	  console.log("sumaPlieguesEndo", sumOfMeasurements);
	  return sumOfMeasurements;
  }

  function endoFactor(measurement, height){
	const endoFactor = sumaPlieguesEndo(measurement)*(170.18/height);
	console.log("endoFactor", endoFactor);
	return endoFactor;
  }

  function ponderalIndex(height, weight){
	const ponderalIndex = height/Math.pow(weight, 1/3);
	console.log("ponderalIndex", ponderalIndex);
	return ponderalIndex;


  }

  function endomorph(measurement, height){
	const factor = endoFactor(measurement, height);
	const endomorph =(-0.7182)+(0.1451*factor)-(0.00068*Math.pow(factor,2))+(0.0000014*Math.pow(factor,3));
	console.log({endomorph})
	return endomorph;
  }

  function mesomorph(measurement, height){
	const {dm_elbow,dm_knee, plg_triceps, plg_calf, prm_calf, prm_arm_contracted} = measurement;
	const mesomorph = (0.858*dm_elbow)+(0.601*dm_knee)+(0.188*(prm_arm_contracted-(plg_triceps/10)))+(0.161*(prm_calf-(plg_calf/10)))-(height*0.131)+4.5;
	console.log({mesomorph})
	return mesomorph;
  }

  function ectomortph(ponderalIndex){
	let ectomortph = 0;
	if(ponderalIndex>40.75){
		ectomortph = (ponderalIndex*0.732)-28.58;
	} else {
		ectomortph =  (ponderalIndex*0.463)-17.63;
	}
	console.log({ectomortph});
	return ectomortph;
  }

  function resultX(ectomortph, endomorph){
	const x = ectomortph - endomorph;
	console.log({x});
	return x;
  }

  function resultY(ectomortph, endomorph, mesomorph){
	const y =  2*mesomorph-(ectomortph+endomorph);
	console.log({y});
	return y;
  }

  function imc(weight, height) {
    const imc = weight / (height * height);
    return imc;
}

function activeMass(measurement, weight){
	const activeMass = weight - (parizcovaFatPercentage(measurement) * weight)/100;
	console.log({activeMass});
	return activeMass;
}

function iaks(measurement, height, weight){
	const iaks =(activeMass(measurement, weight)*100000)/(height*height*height);
	console.log({iaks});
	return iaks;
}

function complexion(measurement, height){
	const {prm_wrist} = measurement;
	const complexion = height/prm_wrist;
	console.log({complexion})
	return complexion;
}

function raizPT(weight, height){
	const raizPt = Math.sqrt(weight/(height/100));
	console.log({raizPt});
	return raizPt;
}

function conicIndex(measurement, weight, height){
	const {prm_waist} = measurement;
	const conicIndex = (prm_waist/100)/(0.109*raizPT(weight, height));
	return conicIndex;
}

function sumOfPlgs(measurement){
	const {
		plg_subscapular,
		plg_triceps,
		plg_supraspinal,
		plg_abdominal,
		plg_thigh,
		plg_calf
	  } = measurement;
	const sumOfPlgs = plg_subscapular + plg_triceps + plg_supraspinal + plg_abdominal + plg_thigh + plg_calf;
	console.log({sumOfPlgs});
	return sumOfPlgs;
}

function fatWeight(measurement, weight, gender) {
	const fatPercentage = yhaszFatPercentage(measurement,gender);
	console.log("% ", fatPercentage);
	const fatWeight = (fatPercentage*weight)/100;
	console.log({fatWeight});
	return fatWeight;
}

function freeFatWeight(measurement, weight, gender){
	const freeFatWeight = weight - fatWeight(measurement, weight, gender);
	console.log({freeFatWeight});
	return freeFatWeight;
}

function residualWeight(weight, gender){
	let residualWeight;
	// Hombre
	if(gender){
		residualWeight = weight * 0.209;
	} else {
		residualWeight = weight *0.241;
	}
	console.log({residualWeight});
	return residualWeight;
}

function desiredIMC(gender){
	if(gender){
		return 20;
	} else {
		return 20;
	}
}

function desiredWeight(height, gender){
	const dIMC = desiredIMC(gender);
	const desiredWeight = dIMC*((height/100)*(height/100));
	console.log({desiredWeight});
	return desiredWeight;
}

function desiredFatPercentage(gender){
	if(gender){
		return 7.5;
	} else {
		return 7.5;
	}
}

function desiredFat2MethodPercentage(measurement, weight, gender){
	const plg = freeFatWeight(measurement, weight, gender)
	const desiredFat2MethodPercentage = (plg/(1-(desiredFatPercentage(gender)/100)));
	console.log({desiredFat2MethodPercentage});
	return desiredFat2MethodPercentage;
}



  const measurement = {
	plg_triceps: 26,
	plg_bicep: 17,
	plg_subscapular: 32,
	plg_suprailiac: 40,
	plg_supraspinal: 35,
	plg_abdominal: 47,
	plg_thigh: 29,
	plg_calf: 33,
	dm_elbow: 8,
	dm_knee: 12,
	prm_calf: 46.7,
	prm_arm_contracted: 42,
	prm_wrist: 18.8,
	prm_waist: 104.5
  };

  endomorph(measurement, 203);
  mesomorph(measurement, 203);
  ectomortph(ponderalIndex(203, 81.4));
  resultX(ectomortph(ponderalIndex(203, 81.4)), endomorph(measurement, 203));
  resultY(ectomortph(ponderalIndex(203, 81.4)), endomorph(measurement, 203), mesomorph(measurement, 203));
  imc(81.4, 203);
  iaks(measurement, 203, 81.4);
  complexion(measurement, 203)
  raizPT(81.4, 203);
  conicIndex(measurement, 81.4, 203);
  sumOfPlgs(measurement);
  sumaPlieguesEndo(measurement, true);
  endoFactor(measurement, 203);
  yhaszFatPercentage(measurement, true);
  ponderalIndex(203, 81.4);
  faulknerFatPercentage(measurement, true);
  parizcovaFatPercentage(measurement, true);
  fatWeight(measurement, 81.4, true);
  freeFatWeight(measurement, 81.4, true);
  activeMass(measurement, 81.4);
  residualWeight(81.4, true);
  desiredWeight(203, true);
  desiredFat2MethodPercentage(measurement, 81.4, true);



  