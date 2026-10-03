import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

import logo from '../../Components/logo.jpg';


const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '50%'
  },
  column: { // Columna
    fontSize: 12
  },
  columnaCompleta: {
    border: '1px solid black',
    width: "100%",
    padding: "3px 3px 3px 3px",
    fontWeight: "bold",
  },
  row: { // Fila
    flexDirection: 'row'
  },
  fondoAzul: {
    backgroundColor: "rgb(97, 161, 235)"
  },
  fondVerde: {
    backgroundColor: 'rgb(38, 100, 38)'
  },
  fondoAmarillo: {
    backgroundColor: 'rgb(252, 236, 147)'
  },
  borde: {
    border: '1px solid black',
    width: "80%",
    padding: "3px 3px 3px 3px",
    fontWeight: "bold",
  },
  bord: {
    border: '1px solid black',
    width: "70%",
    padding: "3px 3px 3px 3px",
    fontWeight: "bold"
  },
  valor: {
    width: "20%",
    padding: "3px 3px 3px 3px",
    fontWeight: "bold",
    border: '1px solid black',
    borderLeftColor: "rgb(97, 161, 235)",
    backgroundColor: "rgb(97, 161, 235)"
  },
  valores: {
    width: "30%",
    padding: "3px 3px 3px 3px",
    fontWeight: "bold",
    border: '1px solid black',
  },
  valore: {
    width: "30%",
    padding: "3px 3px 3px 3px",
    fontWeight: "bold",
    border: '1px solid black',
    borderLeftColor: "rgb(97, 161, 235)",
    backgroundColor: "rgb(97, 161, 235)"
  }
});

const calculateAge = (birthday) => {
  const dob = new Date(birthday);
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms);
  const age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return age;
};

const fmt = (val, dec = 2) => {
  if (val === null || val === undefined || isNaN(val) || val === '') return "—";
  return Number(val).toFixed(dec);
};

// Create Document Component
export const ExportablePDF = React.memo(({ record, results, translate, user, nutritionist, referencedSomatotype }) => {
  const hasParaclinicals = Boolean(
    record && (
      record.blood_pressure ||
      record.glucose ||
      record.hba1c ||
      record.cholesterol_total ||
      record.cholesterol_hdl ||
      record.cholesterol_ldl ||
      record.triglycerides ||
      record.creatinine ||
      record.uric_acid ||
      record.hemoglobin ||
      record.t3_t4 ||
      record.paraclinicals_notes
    )
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>

          <View style={{ ...styles.row, ...styles.fondoAzul }}>
            <Text style={styles.column}>
              {translate("resources.user.fields.nutritionist")}: {`${nutritionist.firstname} ${nutritionist.lastname}`}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord, ...styles.columnaCompleta }}>
              {translate("resources.measurement.fields.user_id")}: 
              {`${user.firstname} ${user.lastname}`}
            </Text>
          </View>



          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord, ...styles.columnaCompleta }}>
              {translate(
                "resources.measurement.fields.referenced_somatotype_id"
              )}: 
              {referencedSomatotype.sport}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.modality")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {referencedSomatotype.gender
                ? translate("myroot.male")
                : translate("myroot.female")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.trainingPeriod")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.trainingPeriod}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.evaluation_date")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.evaluation_date}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.birthdayDate")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {user.birthday}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.gender")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {results.gender
                ? translate("myroot.male")
                : translate("myroot.female")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.age")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {calculateAge(user.birthday)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord, ...styles.fondVerde, ...styles.columnaCompleta }}>
              {translate("myroot.mediciones")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.weight")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.weight}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.height")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.height}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.bord }}>
              {translate("myroot.pliegues")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_triceps")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_triceps}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_bicep")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_bicep}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_subscapular")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_subscapular}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_suprailiac")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_suprailiac}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_supraspinal")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_supraspinal}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_abdominal")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_abdominal}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_thigh")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_thigh}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_calf")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_calf}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_chest")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_chest}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_armpit")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_armpit}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.bord }}>
              {translate("myroot.perímetros")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.prm_arm")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.prm_arm}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.prm_arm_contracted")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.prm_arm_contracted}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.prm_wrist")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.prm_wrist}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.prm_waist")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.prm_waist}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.prm_hip")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.prm_hip}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.prm_calf")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.prm_calf}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.prm_chest")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.prm_chest}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.plg_armpit")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.plg_armpit}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.bord }}>
              {translate("myroot.diametro")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.dm_elbow")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.dm_elbow}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.dm_knee")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.dm_knee}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.bord }}>
              {translate("resources.measurement.fields.dm_wrist")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {record.dm_wrist}
            </Text>
          </View>




        </View>
        {/* Este es el otro lado */}
        <View style={styles.section}>

          <View style={styles.row}>
            <Image src={logo} style={{ width: "100%" }} />
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.borde }}>
              {translate("myroot.somatotipo actual")}
            </Text>
            <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>
              {" "}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.endomorph")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.endomorph)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.mesomorph")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.mesomorph)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.ectomorph")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.ectomorph)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.x")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {record.x ?? "—"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.y")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {record.y ?? "—"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text>{" "}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta }}>
              {translate("myroot.somatotipo de referencia")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.resultX")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.resultX)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.resultY")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.resultY)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text>{" "}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta }}>
              {translate("myroot.fatPercentageIndices")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.imc")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.imc)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.iaks")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.iaks)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.complexion")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.complexion)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.conicIndex")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.conicIndex)}
            </Text>
          </View>


          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.sumOfPlgs")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.sumOfPlgs)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.yhaszFatPercentage")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.yhaszFatPercentage)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta }}>
              {translate("myroot.bodyComposition")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.fatWeight")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.fatWeight)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.freeFatWeight")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.freeFatWeight)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta }}>
              {translate("myroot.ExpectedValues")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.sumaPlieguesEndo")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valore }}>
              {fmt(results?.sumaPlieguesEndo)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.yhaszFatPercentageSumaPliegues")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.faulknerFatPercentage)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate(
                "resources.measurement.fields.fatPercentageForPerformance"
              )}
            </Text>
            <Text style={{ ...styles.column, ...styles.valore }}>
              {fmt(results?.parizcovaFatPercentage)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.desiredIMC")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valore }}>
              {fmt(results?.desiredIMC)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate("resources.measurement.fields.desiredWeight")}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.desiredWeight)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ ...styles.column, ...styles.borde }}>
              {translate(
                "resources.measurement.fields.desiredFat2MethodPercentage"
              )}
            </Text>
            <Text style={{ ...styles.column, ...styles.valores }}>
              {fmt(results?.desiredFat2MethodPercentage)}
            </Text>
          </View>
        </View>
      </Page>
      {hasParaclinicals && (
        <Page size="A4" style={styles.page}>
          <View style={{ ...styles.section, width: "100%" }}>
            <View style={{ ...styles.row, ...styles.fondVerde, ...styles.columnaCompleta, marginBottom: 8 }}>
              <Text style={{ ...styles.column, color: "#ffffff" }}>
                EXÁMENES PARACLÍNICOS & MARCADORES DE LABORATORIO
              </Text>
            </View>

            {record.blood_pressure && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Presión Arterial</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.blood_pressure}</Text>
              </View>
            )}
            {record.glucose && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Glucosa en Ayunas (mg/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.glucose}</Text>
              </View>
            )}
            {record.hba1c && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Hemoglobina Glicosilada HbA1c (%)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.hba1c}</Text>
              </View>
            )}
            {record.hemoglobin && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Hemoglobina / Hematocrito (g/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.hemoglobin}</Text>
              </View>
            )}
            {record.cholesterol_total && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Colesterol Total (mg/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.cholesterol_total}</Text>
              </View>
            )}
            {record.cholesterol_hdl && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Colesterol HDL (mg/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.cholesterol_hdl}</Text>
              </View>
            )}
            {record.cholesterol_ldl && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Colesterol LDL (mg/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.cholesterol_ldl}</Text>
              </View>
            )}
            {record.triglycerides && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Triglicéridos (mg/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.triglycerides}</Text>
              </View>
            )}
            {record.creatinine && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Creatinina Sérica (mg/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.creatinine}</Text>
              </View>
            )}
            {record.uric_acid && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Ácido Úrico (mg/dL)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.uric_acid}</Text>
              </View>
            )}
            {record.t3_t4 && (
              <View style={styles.row}>
                <Text style={{ ...styles.column, ...styles.bord }}>Perfil Tiroideo (T3 / T4)</Text>
                <Text style={{ ...styles.column, ...styles.fondoAzul, ...styles.valore }}>{record.t3_t4}</Text>
              </View>
            )}
            {record.paraclinicals_notes && (
              <View style={{ ...styles.row, marginTop: 6 }}>
                <Text style={{ ...styles.column, ...styles.columnaCompleta }}>
                  Observaciones Paraclínicas: {record.paraclinicals_notes}
                </Text>
              </View>
            )}
          </View>
        </Page>
      )}
    </Document>
  );
});
