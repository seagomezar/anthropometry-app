import React from "react";
import{
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {
  DateField,
  FunctionField,
  NumberField,
  useTranslate,
  Show,
  ReferenceField,
  useShowContext,
  TextField
} from "react-admin";
import { Typography } from "@mui/material";
import "./tablas.css";
import { generateResults } from "../../Providers/retultsProvider";
import {ExportablePDF} from "./ExportablePDF";

const MeasurementShowLayout = () => {
  const translate = useTranslate();
  const {
    error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onError` side effect.
    isLoading, // boolean that is true until the record is available for the first time
    record,
  } = useShowContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  } else {
    const results = generateResults(record, record.height, record.weight, true);
    return (
      <React.Fragment>
        <PDFDownloadLink
          document={
            <ExportablePDF
              record={record}
              results={results}
              translate={translate}
            />
          }
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
        <table border="2">
          <tbody>
          <tr >
          <td className="n">
          <Typography variant="h6" gutterBottom>
                <b>{translate("resources.user.fields.nutritionist")}</b>
              </Typography>
          </td>
            <td className="n">
              <ReferenceField
                source="nutritionist_id"
                reference="nutritionist"
                fullWidth
              />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.user_id")}</b>
              </Typography>
            </td>
            <td className="n">
              {" "}
              <b>
                <ReferenceField source="user_id" reference="user" fullWidth />
              </b>
            </td>
          </tr>

          <tr>
            <td className="t">
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate(
                    "resources.measurement.fields.referenced_somatotype_id"
                  )}
                </b>
              </Typography>
            </td>
            <td className="n">
              <ReferenceField
                source="referenced_somatotype_id"
                reference="referenced_somatotype"
                fullWidth
              ></ReferenceField>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.modality")}</b>
              </Typography>
            </td>
            <td className="n">
              {" "}
              <ReferenceField
                source="referenced_somatotype_id"
                reference="referenced_somatotype"
                fullWidth
              ></ReferenceField>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.training_period")}
                </b>
              </Typography>
            </td>
            <td className="n">
              <TextField source="training_period" />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.evaluation_date")}
                </b>
              </Typography>
            </td>
            <td className="n">
              <DateField source="evaluation_date" />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.birthdayDate")}</b>
              </Typography>
            </td>
            <td className="n">
            <ReferenceField source="user_id" reference="user">
                <TextField source="birthday" />
            </ReferenceField>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.gender")}</b>
              </Typography>
            </td>
            <td className="n">
            <ReferenceField source="user_id" reference="user">
              <FunctionField
                
                source="gender"
                render={(record) =>{
                  return record.gender
                    ? translate("myroot.male")
                    : translate("myroot.female")
                }
                }
              />
              </ReferenceField>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.age")}</b>
              </Typography>
            </td>
            <td className="n">
              <ReferenceField source="user_id" reference="user">
              <FunctionField
                source="gender"
                render={(record) =>{
                  const dob = new Date(record.birthday);
                  const diff_ms = Date.now() - dob.getTime();
                  const age_dt = new Date(diff_ms); 
                
                  return Math.abs(age_dt.getUTCFullYear() - 1970);
                }
                }
              />
              </ReferenceField>
            </td>
          </tr>

          <tr className="med">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.mediciones")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.weight")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="weight" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.height")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="height" fullWidth />
            </td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.pliegues")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.plg_triceps")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_triceps" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.plg_bicep")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_bicep" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.plg_subscapular")}
                </b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_subscapular" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.plg_suprailiac")}
                </b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_suprailiac" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.plg_supraspinal")}
                </b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_supraspinal" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.plg_abdominal")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_abdominal" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.plg_thigh")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_thigh" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.plg_calf")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_calf" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.plg_chest")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_chest" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.plg_armpit")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="plg_armpit" fullWidth />
            </td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.perímetros")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.prm_arm")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="prm_arm" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.prm_arm_contracted")}
                </b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="prm_arm_contracted" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.prm_wrist")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="prm_wrist" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.prm_waist")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="prm_waist" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.prm_hip")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="prm_hip" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.prm_calf")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="prm_calf" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.prm_chest")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="prm_chest" fullWidth />
            </td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.diametro")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.dm_elbow")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="dm_elbow" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.dm_knee")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="dm_knee" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.dm_wrist")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="dm_wrist" fullWidth />
            </td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.somatotipo actual")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.endomorph")}</b>
              </Typography>
            </td>
            <td className="n">{results.endomorph.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.mesomorph")}</b>
              </Typography>
            </td>
            <td className="n">{results.mesomorph.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.ectomorph")}</b>
              </Typography>
            </td>
            <td className="n">{results.ectomorph.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.x")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="x" fullWidth />
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.y")}</b>
              </Typography>
            </td>
            <td className="n">
              <NumberField source="y" fullWidth />
            </td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.somatotipo de referencia")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.resultX")}</b>
              </Typography>
            </td>
            <td className="n">{results.resultX.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.resultY")}</b>
              </Typography>
            </td>
            <td className="n">{results.resultY.toFixed(2)}</td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.fatPercentageIndices")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.imc")}</b>
              </Typography>
            </td>
            <td className="n">{results.imc.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.iaks")}</b>
              </Typography>
            </td>
            <td className="n">{results.iaks.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.complexion")}</b>
              </Typography>
            </td>
            <td className="n">{results.complexion.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.conicIndex")}</b>
              </Typography>
            </td>
            <td className="n">{results.conicIndex.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.sumOfPlgs")}</b>
              </Typography>
            </td>
            <td className="n">{results.sumOfPlgs.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.yhaszFatPercentage")}
                </b>
              </Typography>
            </td>
            <td className="n">{results.yhaszFatPercentage.toFixed(2)}</td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.bodyComposition")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.fatWeight")}</b>
              </Typography>
            </td>
            <td className="n">{results.fatWeight.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.freeFatWeight")}</b>
              </Typography>
            </td>
            <td className="n">{results.freeFatWeight.toFixed(2)}</td>
          </tr>

          <tr className="pli">
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("myroot.ExpectedValues")}</b>
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate("resources.measurement.fields.sumaPlieguesEndo")}
                </b>
              </Typography>
            </td>
            <td className="n">{results.sumaPlieguesEndo.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate(
                    "resources.measurement.fields.yhaszFatPercentageSumaPliegues"
                  )}
                </b>
              </Typography>
            </td>
            <td className="n">{results.faulknerFatPercentage.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate(
                    "resources.measurement.fields.fatPercentageForPerformance"
                  )}
                </b>
              </Typography>
            </td>
            <td className="n">{results.parizcovaFatPercentage.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.desiredIMC")}</b>
              </Typography>
            </td>
            <td className="n">{results.desiredIMC.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>{translate("resources.measurement.fields.desiredWeight")}</b>
              </Typography>
            </td>
            <td className="n">{results.desiredWeight.toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <Typography variant="h6" gutterBottom>
                <b>
                  {translate(
                    "resources.measurement.fields.desiredFat2MethodPercentage"
                  )}
                </b>
              </Typography>
            </td>
            <td className="n">
              {results.desiredFat2MethodPercentage.toFixed(2)}
            </td>
          </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
};

export const MeasurementShowPageTable = () => {
  return (
    <Show>
      <MeasurementShowLayout />
    </Show>
  );
};



