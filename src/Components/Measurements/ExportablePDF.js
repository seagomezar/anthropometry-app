import {
    Page,
    Text,
    View,
    Document,
    StyleSheet
  } from "@react-pdf/renderer";


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
    column:{ // Columna
      fontSize: 12
    },
    columnaCompleta:{
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
    borde:{
      border: '1px solid black',
      width: "80%",
      padding: "3px 3px 3px 3px",
      fontWeight: "bold",
    },
    bord:{
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


  // Create Document Component
export const ExportablePDF = ({ record, results, translate }) => {
    // TODO: Implement this propertly to display the data on PDF
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>

            <View style={{...styles.row, ...styles.fondoAzul}}>
              <Text style={styles.column}>
                {record.nutritionist_id}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={{...styles.column, ...styles.bord}}>
                {translate("resources.measurement.fields.user_id")}
              </Text>
              <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
                {record.user_id}
              </Text>
            </View>



            <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate(
                    "resources.measurement.fields.referenced_somatotype_id"
                  )}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.referenced_somatotype_id}
              </Text>
          </View>
            
          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.modality")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.referenced_somatotype}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.trainingPeriod")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.trainingPeriod}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.evaluation_date")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.evaluation_date}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.birthdayDate")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.birthdayDate}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.gender")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {results.gender
                    ? translate("myroot.male")
                    : translate("myroot.female")}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.age")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.age}
              </Text>
          </View>
          
                <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord, ...styles.fondVerde, ...styles.columnaCompleta}}>
            {translate("myroot.mediciones")}
            </Text>
          </View>            

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.weight")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.weight}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.height")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.height}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.bord}}>
            {translate("myroot.pliegues")}
            </Text>
            <Text style={{...styles.column, ...styles.valores}}>
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_triceps")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_triceps}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_bicep")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_bicep}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_subscapular")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_subscapular}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_suprailiact")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_suprailiac}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_supraspinal")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_supraspinal}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_abdominal")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_abdominal}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_thigh")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_thigh}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_calf")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_calf}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_chest")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_chest}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_armpit")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_armpit}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.bord}}>
            {translate("myroot.perímetros")}
            </Text>
            <Text style={{...styles.column, ...styles.valores}}>
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.prm_arm")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.prm_arm}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.prm_arm_contracted")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.prm_arm_contracted}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.prm_wrist")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.prm_wrist}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.prm_waist")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.prm_waist}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.prm_hip")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.prm_hip}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.prm_calf")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.prm_calf}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.prm_chest")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.prm_chest}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.plg_armpit")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.plg_armpit}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.bord}}>
            {translate("myroot.diametro")}
            </Text>
            <Text style={{...styles.column, ...styles.valores}}>
              </Text>
          </View>
          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.dm_elbow")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.dm_elbow}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.dm_knee")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.dm_knee}
              </Text>
          </View>

          <View style={styles.row}>
            <Text style={{...styles.column, ...styles.bord}}>
            {translate("resources.measurement.fields.dm_wrist")}
            </Text>
            <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
              {record.dm_wrist}
              </Text>
          </View>




          </View>
          {/* Este es el otro lado */}
          <View style={styles.section}>
                
          <View style={styles.row}>
                  <Text>{" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text>{" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text>{" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text>{" "}</Text>
                </View>

                <View style={{...styles.row, ...styles.fondVerde}}>
                  <Text>{" "}</Text>
                </View>

                <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.borde}}>
                {translate("myroot.somatotipo actual")}
              </Text>
              <Text style={{...styles.column, ...styles.fondoAzul, ...styles.valore}}>
                {" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.endomorph")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.endomorph.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.mesomorph")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.mesomorph.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.ectomorph")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.ectomorph.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.x")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {record.x}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.y")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {record.y}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text>{" "}</Text>
                </View>

                <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo,...styles.columnaCompleta}}>
                {translate("myroot.somatotipo de referencia")}
              </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.resultX")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.resultX.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.resultY")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.resultY.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text>{" "}</Text>
                </View>

                <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo,...styles.columnaCompleta}}>
                {translate("myroot.fatPercentageIndices")}
              </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.imc")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.imc.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.iaks")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.iaks.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.complexion")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.complexion.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.conicIndex")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.conicIndex.toFixed(2)}
                  </Text>
                </View>


                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.sumOfPlgs")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.sumOfPlgs.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.yhaszFatPercentage")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.yhaszFatPercentage.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo,...styles.columnaCompleta}}>
                {translate("myroot.bodyComposition")}
              </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.fatWeight")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.fatWeight.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.freeFatWeight")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.freeFatWeight.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo,...styles.columnaCompleta}}>
                {translate("myroot.ExpectedValues")}
              </Text>
                </View>

                  <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.sumaPlieguesEndo")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valore}}>
                  {results.sumaPlieguesEndo.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.yhaszFatPercentageSumaPliegues")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.faulknerFatPercentage.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate(
                    "resources.measurement.fields.fatPercentageForPerformance"
                  )}
                  </Text>
                  <Text style={{...styles.column, ...styles.valore}}>
                  {results.parizcovaFatPercentage.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.desiredIMC")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valore}}>
                  {results.desiredIMC.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.desiredWeight")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.desiredWeight.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate(
                    "resources.measurement.fields.desiredFat2MethodPercentage"
                  )}
                  </Text>
                  <Text style={{...styles.column, ...styles.valores}}>
                  {results.desiredFat2MethodPercentage.toFixed(2)}
                  </Text>
                  </View>
          </View>
        </Page>
      </Document>
    );
  };
  