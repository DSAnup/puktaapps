import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, Button, Alert, ScrollView, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const AddDocumentScreen = ({ route, navigation }) => {
  const { PropertyID } = route.params;
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [note, setNote] = useState("");

  // Fetch document types from API
  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await fetch("https://admin.pukta.us/api/property.cfc?method=getDocumentTypes");
        const result = await response.json();

        if (result.status === "success") {
          setDocumentTypes(result.data);
        } else {
          Alert.alert("Error", "Failed to load document types.");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong.");
      }
    };

    fetchDocumentTypes();
  }, []);

  // Browse File
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"], // Allow images & PDFs
    });

    if (!result.canceled) {
      setDocumentFile(result.assets[0]);
    }
  };

  // Capture Image
  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setDocumentFile(result.assets[0]);
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    if (!selectedDocumentType || !documentFile) {
      Alert.alert("Error", "Please select a document type and upload a file.");
      return;
    }

    let formData = new FormData();
    formData.append("PropertyID", PropertyID);
    formData.append("DocumentTypeID", selectedDocumentType);
    formData.append("Note", note);
    formData.append("documentFile", {
      uri: documentFile.uri,
      name: documentFile.name || "uploaded_file.jpg",
      type: documentFile.mimeType || "image/jpeg",
    });

    try {
      const response = await fetch("https://admin.pukta.us/api/property.cfc?method=addDocument", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        Alert.alert("Success", "Document uploaded successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Upload failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>

          {/* Document Type Dropdown */}
          <View style={{ marginBottom: 15 }}>
            <Text>Document Type:</Text>
            <Picker
              selectedValue={selectedDocumentType}
              onValueChange={(itemValue) => setSelectedDocumentType(itemValue)}
              style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 5 }}
            >
              <Picker.Item label="Select Document Type" value={null} />
              {documentTypes.map((type) => (
                <Picker.Item key={type.DocumentTypeID} label={type.DocumentTypeName} value={type.DocumentTypeID} />
              ))}
            </Picker>
          </View>

          {/* File Picker & Capture Buttons */}
          <View style={{ marginBottom: 15 }}>
            <Button title="Browse File" onPress={pickDocument} />
            <View style={{ marginTop: 10 }} />
            <Button title="Capture Image" onPress={captureImage} />
          </View>

          {/* Show Selected File */}
          {documentFile && (
            <Text style={{ marginBottom: 15 }}>Selected File: {documentFile.name || "Captured Image"}</Text>
          )}

          {/* Note (Scrollable Textarea) */}
          <View style={{ marginBottom: 15 }}>
            <Text>Note:</Text>
            <TextInput 
              style={[styles.input, styles.textarea]} 
              value={note} 
              onChangeText={setNote} 
              multiline
              scrollEnabled
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <Button title="Upload Document" onPress={handleSubmit} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  textarea: {
    height: 100, // Bigger textarea
    maxHeight: 200, // Allow some expansion
    textAlignVertical: "top", // Ensures text starts from the top
  }
};

export default AddDocumentScreen;
