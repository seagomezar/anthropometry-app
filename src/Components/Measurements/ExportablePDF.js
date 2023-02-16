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
    row: { // Fila
      flexDirection: 'row'
    },
    fondoAzul: {
      backgroundColor: "rgb(97, 161, 235)"
    },
    fondVerde: {
      backgroundColor: 'rgb(38, 100, 38)'
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
            
          </View>
        </Page>
      </Document>
    );
  };
  