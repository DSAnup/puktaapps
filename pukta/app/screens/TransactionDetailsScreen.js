// screens/PropertyDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Linking  } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";


const TransactionDetailsScreen = ({ route }) => {
  const { transaction } = route.params;
  const transactionId = transaction.TransactionID;

   const [receipts, setReceipts] = useState([]); // Store fetched data
    const [loading, setLoading] = useState(true); // Loading state
  
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

      const handleFileDownload = async (fileName) => {
        const fileUrl = `https://admin.pukta.us/assets/uploads/Receipt/${fileName}`; 
        try {
            await Linking.openURL(fileUrl);
        } catch (error) {
            console.error("Failed to open file:", error);
        }
    };

      // Handle file download and open
       // Handle file download and open using expo-sharing
    const handleFilePress = async (fileName) => {
      const fileUrl = `https://admin.pukta.us/assets/uploads/Receipt/${fileName}`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      try {
          // Download the file to the local file system
          const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

          // Check if sharing is available and share the file
          if (await Sharing.isAvailableAsync()) {
              await Sharing.shareAsync(uri);
          } else {
              Alert.alert("Sharing not available", "Please open the file manually.");
          }
      } catch (error) {
          Alert.alert("Error", "Unable to open the file. Please check the file format.");
      }
  };
  return (
    <View style={styles.container}>
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
      <Text style={styles.header}>Receipt List</Text>
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
              >
                <View style={styles.cardContent}>
                  {getFileIcon(item.ReceiptFileName)}
                  <View style={styles.infoContainer}>
                      <Text style={styles.title}>{item.ReceiptTitle}</Text>
                      <Text style={styles.details}>Note: {item.Note || "No additional notes"}</Text>
                      <Text style={styles.details}>File: {item.ReceiptFileName}</Text>
                  </View>

                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="download"
                        size={36}
                        color="#007BFF"
                        onPress={() => handleFileDownload(item.ReceiptFileName)}
                    />
                    <MaterialCommunityIcons
                        name="share-variant"
                        size={36}
                        color="#007BFF"
                        onPress={() => handleFilePress(item.ReceiptFileName)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No Receipt found.</Text>
                                </View>
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
  card: {
    flexDirection: "column", // Arrange items in column
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
  cardContent: {
      flexDirection: "row", // Align icon and info in a row
      alignItems: "center",
      marginBottom: 10, // Space between content and icons
  },
  infoContainer: {
      marginLeft: 10,
      flex: 1,
  },
  title: {
      fontSize: 18,
      fontWeight: "600",
  },
  details: {
      fontSize: 14,
      color: "#555",
  },
  iconContainer: {
      flexDirection: "row",
      justifyContent: "flex-end", // Space icons evenly
      paddingTop: 10,
  },
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
