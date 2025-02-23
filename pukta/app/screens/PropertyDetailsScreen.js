// screens/PropertyDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator  } from "react-native";
import { useNavigation } from "@react-navigation/native";


const PropertyDetailsScreen = ({ route }) => {
  const { property } = route.params;
  const PropertyID = property.PropertyID;
  
  const [transactions, setTransactions] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state

  const navigation = useNavigation();

  // Fetch Data from API
      useEffect(() => {
          const fetchTransactions = async () => {
              try {
                  const response = await fetch(`https://admin.pukta.us/api/property.cfc?method=getPropertyTransactions&PropertyID=${PropertyID}`);
                  const data = await response.json();
                  
                  if (data.status === "success") {
                    setTransactions(data.data); // Store property list
                  } else {
                      console.error("Error fetching properties:", data.message);
                  }
              } catch (error) {
                  console.error("Fetch error:", error);
              } finally {
                  setLoading(false); // Stop loading
              }
          };
  
          fetchTransactions();
      }, [PropertyID]); 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Property Details</Text>
      <Text style={styles.detailText}><Text style={styles.label}>Address:</Text> {property.AddressLine1}</Text>
      <Text style={styles.detailText}><Text style={styles.label}>City:</Text> {property.City}</Text>
      <Text style={styles.detailText}><Text style={styles.label}>State:</Text> {property.stateName}</Text>
      <Text style={styles.detailText}><Text style={styles.label}>Zip Code:</Text> {property.ZipCode}</Text>
      
      <Text style={styles.header}>Transaction List</Text>

      {loading ? (
                      <ActivityIndicator size="large" color="#007BFF" />
              ) : 
              (<FlatList
                  data={transactions}
                  keyExtractor={(item) => item.TransactionID.toString()}
                  renderItem={({ item }) => (
                  <TouchableOpacity 
                      style={styles.card} 
                      onPress={() => navigation.navigate("TransactionDetails", { transaction: item, property: property })}
                  >
                      <Text style={styles.title}>{item.PropertySection} 
                        <Text style={styles.details}> ({item.ExpenseType})</Text></Text>
                      <Text style={styles.details}> Amount: {item.Amount}</Text>
                  </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                                              <View style={styles.emptyContainer}>
                                                  <Text style={styles.emptyText}>No Transactions found.</Text>
                                              </View>
                                          )}
              />
              )}
    </View>
    
  );
};

export default PropertyDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  detailText: { fontSize: 18, marginBottom: 10 },
  label: { fontWeight: "bold", color: "#333" },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 16, color: "gray", marginTop: 5 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
      fontSize: 18,
      color: "#888",
      textAlign: "center",
  },
});
