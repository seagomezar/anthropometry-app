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
    },
  });
// Create Document Component
export const ExportablePDF = ({ record, results, translate }) => {
    // TODO: Implement this propertly to display the data on PDF
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>
              {translate(
                "resources.measurement.fields.desiredFat2MethodPercentage"
              )}
            </Text>
            <Text>{results.desiredFat2MethodPercentage.toFixed(2)}</Text>
          </View>
          <View style={styles.section}>
            <Text>{translate("resources.measurement.fields.endomorph")}</Text>
            <Text>{results.endomorph}</Text>
          </View>
        </Page>
      </Document>
    );
  };
  