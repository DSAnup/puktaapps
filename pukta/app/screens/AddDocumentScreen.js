import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AddDocumentScreen = ({ route, navigation }) => {
  const { PropertyID } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Document for Property {PropertyID}</Text>
      <Button title="Upload Document" onPress={() => alert("Document Uploaded!")} />
    </View>
  );
};

export default AddDocumentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
