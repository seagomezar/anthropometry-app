import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { useGetOne, useDataProvider, useTranslate } from "react-admin";
import PolarChart from "../PolarChart";
import BarChart from "../BarChart";
import ScatterChart from "../ScatterChart";
import ResultsChart from "./ResultsChart";

// La formula de Yuhasz para hombres es:  Porcentaje de Grasa Corporal (%) = (0.1051 x suma de los pliegues ) + 2.585
// y para mujeres es Porcentaje de Grasa Corporal (%) = (0.1548 x suma de los pliegues) + 3.580.
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
  const { plg_subscapular, plg_triceps, plg_suprailiac, plg_abdominal } =
    measurement;

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
  const { plg_subscapular, plg_triceps, plg_supraspinal } = measurement;

  // Calculate the sum of all measurements
  const sumOfMeasurements = plg_subscapular + plg_triceps + plg_supraspinal;
  console.log("sumaPlieguesEndo", sumOfMeasurements);
  return sumOfMeasurements;
}

function endoFactor(measurement, height) {
  const endoFactor = sumaPlieguesEndo(measurement) * (170.18 / height);
  console.log("endoFactor", endoFactor);
  return endoFactor;
}

function ponderalIndex(height, weight) {
  const ponderalIndex = height / Math.pow(weight, 1 / 3);
  console.log("ponderalIndex", ponderalIndex);
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
    (activeMass(measurement, weight) * 100000) / (height * height * height);
  console.log({ iaks });
  return iaks;
}

function complexion(measurement, height) {
  const { prm_wrist } = measurement;
  const complexion = height / prm_wrist;
  console.log({ complexion });
  return complexion;
}

function raizPT(weight, height) {
  const raizPt = Math.sqrt(weight / (height / 100));
  console.log({ raizPt });
  return raizPt;
}

function conicIndex(measurement, weight, height) {
  const { prm_waist } = measurement;
  const conicIndex = prm_waist / 100 / (0.109 * raizPT(weight, height));
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
  const fatPercentage = yhaszFatPercentage(measurement, gender);
  console.log("% ", fatPercentage);
  const fatWeight = (fatPercentage * weight) / 100;
  console.log({ fatWeight });
  return fatWeight;
}

function freeFatWeight(measurement, weight, gender) {
  const freeFatWeight = weight - fatWeight(measurement, weight, gender);
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

/*
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
  prm_waist: 104.5,
};

const height = 203;
const weight = 81.4;
const gender = true;
*/

export const Results = () => {
  let { measurementId } = useParams();
  const translate = useTranslate();
  const { data } = useGetOne("measurement", {
    id: measurementId,
  });
  const [user, setUser] = React.useState();
  const [result, setResult] = React.useState({
    activeMass: 0,
    complexion: 0,
    conicIndex: 0,
    desiredFat2MethodPercentage: 0,
    desiredWeight: 0,
    desiredIMC: 0,
    ectomorph: 0,
    endoFactor: 0,
    endomorph: 0,
    fatWeight: 0,
    faulknerFatPercentage: 0,
    freeFatWeight: 0,
    iaks: 0,
    imc: 0,
    mesomorph: 0,
    parizcovaFatPercentage: 0,
    ponderalIndex: 0,
    raizPT: 0,
    residualWeight: 0,
    resultX: 0,
    resultY: 0,
    sumOfPlgs: 0,
    sumaPlieguesEndo: 0,
    yhaszFatPercentage: 0,
  });
  const [referecedSomatotype, setReferencedSomatotype] = React.useState({
    x: 0,
    y: 0,
  });
  const dataProvider = useDataProvider();
  React.useEffect(() => {
    dataProvider.getOne("user", { id: data.user_id }).then((user) => {
      setResult(
        generateResults(
          data,
          data.height,
          data.weight,
          user.gender == "Femenino" ? false : true
        )
      );
      console.log(user);
      setUser(user);
    });
    dataProvider
      .getOne("referenced_somatotype", {
        id: data.referenced_somatotype_id,
      })
      .then((r) => {
        setReferencedSomatotype(r.data);
      });
  }, [data]);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{translate("resources.result.tabbed_data")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.activeMass")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.activeMass).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.complexion")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.complexion).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.conicIndex")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.conicIndex).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate(
                  "resources.result.fields.desiredFat2MethodPercentage"
                )}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.desiredFat2MethodPercentage).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.desiredWeight")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.desiredWeight).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.ectomorph")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.ectomorph).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.endoFactor")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.endoFactor).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.endomorph")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.endomorph).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.fatWeight")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.fatWeight).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.faulknerFatPercentage")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.faulknerFatPercentage).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.freeFatWeight")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.freeFatWeight).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.iaks")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.iaks).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.imc")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.imc).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.mesomorph")}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                {parseFloat(result.mesomorph).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.parizcovaFatPercentage")}
              </Typography>{" "}
              {parseFloat(result.parizcovaFatPercentage).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.ponderalIndex")}
              </Typography>{" "}
              {parseFloat(result.ponderalIndex).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.raizPT")}
              </Typography>{" "}
              {parseFloat(result.raizPT).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.residualWeight")}
              </Typography>{" "}
              {parseFloat(result.residualWeight).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.resultX")}
              </Typography>{" "}
              {parseFloat(result.resultX).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.resultY")}
              </Typography>{" "}
              {parseFloat(result.resultY).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.sumOfPlgs")}
              </Typography>{" "}
              {parseFloat(result.sumOfPlgs).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.sumaPlieguesEndo")}
              </Typography>{" "}
              {parseFloat(result.sumaPlieguesEndo).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.result.fields.yhaszFatPercentage")}
              </Typography>{" "}
              {parseFloat(result.yhaszFatPercentage).toFixed(2)}
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{translate("resources.result.body_type")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ maxWidth: 500 }}>
            <PolarChart
              x={[
                translate("resources.result.fields.ectomorph"),
                translate("resources.result.fields.endomorph"),
                translate("resources.result.fields.mesomorph"),
              ]}
              y={[result.ectomorph, result.endomorph, result.mesomorph]}
              title={translate("resources.result.body_type")}
            />
          </Box>
          <Box sx={{ maxWidth: 500 }}>
            <ScatterChart
              labels={[
                translate("resources.result.x_y_actual"),
                translate("resources.result.x_y_referenced"),
              ]}
              points={[
                { x: result.resultX, y: result.resultY },
                {
                  x: referecedSomatotype.x,
                  y: referecedSomatotype.y,
                },
              ]}
              title={translate("resources.result.x_y_compairson")}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {translate("resources.result.fat_percentages")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ maxWidth: 500 }}>
            <BarChart
              x={[
                translate("resources.result.fields.yhaszFatPercentage"),
                translate("resources.result.fields.faulknerFatPercentage"),
                translate("resources.result.fields.parizcovaFatPercentage"),
              ]}
              y={[
                result.yhaszFatPercentage,
                result.faulknerFatPercentage,
                result.parizcovaFatPercentage,
              ]}
              title={translate("resources.result.fat_percentages")}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{translate("resources.result.imc_analysis")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ maxWidth: 500 }}>
            <BarChart
              x={[
                translate("resources.result.fields.desiredIMC"),
                translate("resources.result.fields.imc"),
              ]}
              y={[result.desiredIMC, result.imc]}
              title={translate("resources.result.imc_analysis")}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{translate("resources.result.historic")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user && <ResultsChart user={user.data} />}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
