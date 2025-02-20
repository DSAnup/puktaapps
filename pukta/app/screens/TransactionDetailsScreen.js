// screens/PropertyDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator  } from "react-native";
import { useNavigation } from "@react-navigation/native";


const TransactionDetailsScreen = ({ route }) => {
  const { transaction, property } = route.params;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{property.AddressLine1}</Text>
      <Text style={styles.details}>{property.City}, {property.stateName} - {property.ZipCode}</Text> */}
      <Text style={styles.detailText}>
        <Text style={styles.label}>Property Section:</Text> {transaction.PropertySection}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Expense Type:</Text> {transaction.ExpenseType}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Amount:</Text> {transaction.Amount}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Transaction Date:</Text> {transaction.TransactionDate}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Payee:</Text> {transaction.Payee}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Note:</Text> {transaction.Note}
      </Text>
    </View>
    
  );
};

export default TransactionDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  detailText: { fontSize: 16, marginBottom: 10 },
  label: { fontWeight: "bold", color: "#333" },
  title: { fontSize: 18, fontWeight: "bold", textAlign:'center' },
  details: { fontSize: 16, color: "gray", marginTop: 5, textAlign:'center', paddingBottom: 10 },
});
