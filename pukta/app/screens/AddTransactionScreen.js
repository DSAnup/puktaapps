import React, { useEffect, useState } from "react";
import { 
  View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Platform 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTransactionScreen = ({ route, navigation }) => {
  const { PropertyID } = route.params; // Get PropertyID from route params

  const [payee, setPayee] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [propertySections, setPropertySections] = useState([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [selectedPropertySection, setSelectedPropertySection] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // Fetch Expense Types from API
  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const response = await fetch("https://admin.pukta.us/api/property.cfc?method=getExpenseTypes");
        const data = await response.json();

        if (data.status === "success") {
          setExpenseTypes(data.data);
          setSelectedExpenseType(data.data.length > 0 ? data.data[0].ExpenseTypeID : "");
        } else {
          console.error("Error fetching expense types:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchExpenseTypes();
  }, []);

  // Fetch Expense Types from API
  useEffect(() => {
    const fetchPropertySections = async () => {
      try {
        const response = await fetch("https://admin.pukta.us/api/property.cfc?method=getPropertySection");
        const data = await response.json();

        if (data.status === "success") {
          setPropertySections(data.data);
          setSelectedPropertySection(data.data.length > 0 ? data.data[0].ExpenseTypeID : "");
        } else {
          console.error("Error fetching expense types:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPropertySections();
  }, []);

  // Handle date selection
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTransactionDate(selectedDate);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!payee || !selectedExpenseType || !amount) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    const transactionData = {
      PropertyID,
      Payee: payee,
      TransactionDate: transactionDate.toISOString().split("T")[0], // Format YYYY-MM-DD
      ExpenseTypeID: selectedExpenseType,
      PropertySectionID: selectedPropertySection,
      Amount: parseFloat(amount),
      Note: note,
    };

    try {
      const response = await fetch("https://admin.pukta.us/api/property.cfc?method=addTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      const result = await response.json();

      if (result.status === "success") {
        Alert.alert("Success", "Transaction added successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Failed to add transaction.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Payee</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter Payee" 
        value={payee} 
        onChangeText={setPayee} 
      />

      <Text style={styles.label}>Transaction Date</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{transactionDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={transactionDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Expense Type</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedPropertySection} onValueChange={(value) => setSelectedExpenseType(value)}>
          {expenseTypes.map((type) => (
            <Picker.Item key={type.ExpenseTypeID} label={type.ExpenseTypeName} value={type.ExpenseTypeID} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Property Section</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedExpenseType} onValueChange={(value) => setSelectedPropertySection(value)}>
          {propertySections.map((type) => (
            <Picker.Item key={type.PropertySectionID} label={type.PropertySectionName} value={type.PropertySectionID} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Note</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Enter Note (optional)"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <Button title="Add Transaction" onPress={handleSubmit} color="#007BFF" />
    </View>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  pickerContainer: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 5, 
    marginBottom: 10 
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
});
