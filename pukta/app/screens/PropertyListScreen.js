// screens/PropertyListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator  } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PropertyListScreen = ({ route  }) => {
    const user = route.params?.user;
    const AppUserId = user.userinfo.APPUSERID[0]

    const [properties, setProperties] = useState([]); // Store fetched data
    const [loading, setLoading] = useState(true); // Loading state

    const navigation = useNavigation();

    // Fetch Data from API
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`https://admin.pukta.us/api/login.cfc?method=getPropertiesByUserID&AppUserID=${AppUserId}`);
                const data = await response.json();
                
                if (data.status === "success") {
                    setProperties(data.data); // Store property list
                } else {
                    console.error("Error fetching properties:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProperties();
    }, [AppUserId]); // Fetch when AppUserId changes

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Property List</Text>
        {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
        ) : 
        (<FlatList
            data={properties}
            keyExtractor={(item) => item.PropertyID.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity 
                style={styles.card} 
                onPress={() => navigation.navigate("PropertyDetails", { property: item })}
            >
                <Text style={styles.title}>{item.AddressLine1}</Text>
                <Text style={styles.details}>{item.City}, {item.stateName} - {item.ZipCode}</Text>
            </TouchableOpacity>
            )}
        />
        )}
        </View>
    );
};

export default PropertyListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
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
});
