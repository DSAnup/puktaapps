// screens/PropertyDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Linking  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const TransactionDetailsScreen = ({ route }) => {
  const { transaction, property } = route.params;
  const transactionId = transaction.TransactionID;
  console.log(transactionId)

   const [receipts, setReceipts] = useState([]); // Store fetched data
    const [loading, setLoading] = useState(true); // Loading state
  
    const navigation = useNavigation();
  
    // Fetch Data from API
        useEffect(() => {
            const fetchReceipts = async () => {
                try {
                    const response = await fetch(`https://admin.pukta.us/api/property.cfc?method=getTransactionReceipt&ReceiptID=${transactionId}`);
                    const data = await response.json();
                    
                    if (data.status === "success") {
                      setReceipts(data.data); // Store property list
                    } else {
                        console.error("Error fetching properties:", data.message);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                } finally {
                    setLoading(false); // Stop loading
                }
            };
    
            fetchReceipts();
        }, [transactionId]); 


        const getFileIcon = (fileName) => {
          const extension = fileName.split('.').pop().toLowerCase();
          switch (extension) {
              case "pdf":
                  return <MaterialCommunityIcons name="file-pdf-box" size={48} color="#E74C3C" />;
              case "xlsx":
              case "xls":
                  return <MaterialCommunityIcons name="file-excel-box" size={48} color="#27AE60" />;
              case "png":
              case "jpg":
              case "jpeg":
                  return <MaterialCommunityIcons name="file-image" size={48} color="#3498DB" />;
              default:
                  return <MaterialCommunityIcons name="file" size={48} color="#95A5A6" />;
          }
      };

      const handleFilePress = async (fileName) => {
        const fileUrl = `https://admin.pukta.us/assets/uploads/Receipt/${fileName}`; // Adjust the URL as needed
        console.log(fileUrl);
        try {
            await Linking.openURL(fileUrl);
        } catch (error) {
            console.error("Failed to open file:", error);
        }
    };

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
      <Text style={styles.header}>Recipt List</Text>
      {loading ? 
      (
        <ActivityIndicator size="large" color="#007BFF" />
       ) : 
      ( <FlatList
            data={receipts}
            keyExtractor={(item) => item.ReceiptID.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
              style={styles.card} 
              onPress={() => handleFilePress(item.ReceiptFileName)}
              >
                {getFileIcon(item.ReceiptFileName)}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item.ReceiptTitle}</Text>
                    <Text style={styles.details}>Note: {item.Note || "No additional notes"}</Text>
                    <Text style={styles.details}>File: {item.ReceiptFileName}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

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
  card: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 10, 
    backgroundColor: "#fff", 
    borderRadius: 8, 
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
},
infoContainer: { marginLeft: 10, flex: 1 }
});
