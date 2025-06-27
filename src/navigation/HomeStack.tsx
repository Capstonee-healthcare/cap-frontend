// src/navigation/HomeStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";

// Temporary Home Screen Component
const HomeScreen = () => (
	<View style={styles.container}>
		<Text style={styles.title}>Welcome to Home</Text>
		<Text style={styles.subtitle}>This is your dashboard</Text>
	</View>
);

const Stack = createNativeStackNavigator();

const HomeStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="HomeMain" component={HomeScreen} />
	</Stack.Navigator>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
	},
});

export default HomeStack;
