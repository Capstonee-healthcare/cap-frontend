// src/navigation/MapsStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapsScreen from "../screens/chatfeature/MapsScreen";
import ClinicDetailsScreen from "../screens/chatfeature/ClinicDetailsScreen";

const Stack = createNativeStackNavigator();

const MapsStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="MapsMain" component={MapsScreen} />
		<Stack.Screen name="ClinicDetails" component={ClinicDetailsScreen} />
	</Stack.Navigator>
);

export default MapsStack;
