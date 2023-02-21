import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    PDFDownloadLink,
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
      width:'50%'
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
    fondBlanco: {
      backgroundColor: 'rgb(254, 254, 254)'
    },
    borde:{
      border: '1px solid black',
      width: "80%",
      padding: "5px 5px 5px 5px",
      fontWeight: "bold",
    },
    valor: {
      width: "20%",
      padding: "5px 5px 5px 5px",
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
              <Text style={styles.column}>
                {translate("resources.measurement.fields.user_id")}
              </Text>
              <Text style={{...styles.column, ...styles.fondoAzul}}>
                {record.user_id}
              </Text>
            </View>



            <View style={styles.row}>

            <Text style={styles.column}>
              {translate(
                "resources.measurement.fields.desiredFat2MethodPercentage"
              )}
            </Text>

            <Text style={styles.text}>{results.desiredFat2MethodPercentage.toFixed(2)}</Text>

          </View>
            
          </View>


          {/* Este es el otro lado */}
          <View style={styles.section}>

                <View style={{...styles.row, ...styles.fondVerde}}>
                  <Text>{" "}</Text>
                </View>

                <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo}}>
                {translate("myroot.somatotipo actual")}
              </Text>
              <Text style={{...styles.column, ...styles.fondoAzul, ...styles.columnaCompleta}}>
                {" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.endomorph")}
                  </Text>
                  <Text style={styles.column}>
                  {results.endomorph.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.mesomorph")}
                  </Text>
                  <Text style={styles.column}>
                  {results.mesomorph.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.ectomorph")}
                  </Text>
                  <Text style={styles.column}>
                  {results.ectomorph.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.x")}
                  </Text>
                  <Text style={styles.column}>
                  {record.x}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.y")}
                  </Text>
                  <Text style={styles.column}>
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
              <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta}}>
                {" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.resultX")}
                  </Text>
                  <Text style={styles.column}>
                  {results.resultX.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.resultY")}
                  </Text>
                  <Text style={styles.column}>
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
              <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta}}>
                {" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.imc")}
                  </Text>
                  <Text style={styles.column}>
                  {results.imc.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.iaks")}
                  </Text>
                  <Text style={styles.column}>
                  {results.iaks.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.complexion")}
                  </Text>
                  <Text style={styles.column}>
                  {results.complexion.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{...styles.column, ...styles.borde}}>
                  {translate("resources.measurement.fields.conicIndex")}
                  </Text>
                  <Text style={{...styles.column, ...styles.valor}}>
                  {results.conicIndex.toFixed(2)}
                  </Text>
                </View>


                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.sumOfPlgs")}
                  </Text>
                  <Text style={styles.column}>
                  {results.sumOfPlgs.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.yhaszFatPercentage")}
                  </Text>
                  <Text style={styles.column}>
                  {results.yhaszFatPercentage.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo,...styles.columnaCompleta}}>
                {translate("myroot.bodyComposition")}
              </Text>
              <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta}}>
                {" "}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.fatWeight")}
                  </Text>
                  <Text style={styles.column}>
                  {results.fatWeight.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.freeFatWeight")}
                  </Text>
                  <Text style={styles.column}>
                  {results.freeFatWeight.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                <Text style={{...styles.column, ...styles.fondoAmarillo,...styles.columnaCompleta}}>
                {translate("myroot.ExpectedValues")}
              </Text>
              <Text style={{...styles.column, ...styles.fondoAmarillo, ...styles.columnaCompleta}}>
                {" "}</Text>
                </View>

                  <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.sumaPlieguesEndo")}
                  </Text>
                  <Text style={styles.column}>
                  {results.sumaPlieguesEndo.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.yhaszFatPercentageSumaPliegues")}
                  </Text>
                  <Text style={styles.column}>
                  {results.faulknerFatPercentage.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate(
                    "resources.measurement.fields.fatPercentageForPerformance"
                  )}
                  </Text>
                  <Text style={styles.column}>
                  {results.parizcovaFatPercentage.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.desiredIMC")}
                  </Text>
                  <Text style={styles.column}>
                  {results.desiredIMC.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate("resources.measurement.fields.desiredWeight")}
                  </Text>
                  <Text style={styles.column}>
                  {results.desiredWeight.toFixed(2)}
                  </Text>
                  </View>

                  <View style={styles.row}>
                  <Text style={styles.column}>
                  {translate(
                    "resources.measurement.fields.desiredFat2MethodPercentage"
                  )}
                  </Text>
                  <Text style={styles.column}>
                  {results.desiredFat2MethodPercentage.toFixed(2)}
                  </Text>
                  </View>
          </View>
        </Page>
      </Document>
    );
  };
  