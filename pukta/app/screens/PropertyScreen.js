// screens/PropertyScreen.js
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import PropertyListScreen from "./PropertyListScreen";
import PropertyDetailsScreen from "./PropertyDetailsScreen";
import TransactionDetailsScreen from "./TransactionDetailsScreen";

const Stack = createStackNavigator();

const PropertyScreen = ({ user }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="PropertyList" 
          component={PropertyListScreen} 
          options={{ title: "Properties" }} 
          initialParams={{ user }}
        />
        <Stack.Screen 
          name="PropertyDetails" 
          component={PropertyDetailsScreen} 
          options={{ title: "Property Details" }} 
        />
        <Stack.Screen 
          name="TransactionDetails" 
          component={TransactionDetailsScreen} 
          options={{ title: "Transaction Details" }} 
        />
      </Stack.Navigator>
    );
  };
  

export default PropertyScreen;
