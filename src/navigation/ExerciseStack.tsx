// src/navigation/ExerciseStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerciseScreen from "../screens/ExerciseFlow/ExerciseScreen";
import ExerciseDetailScreen from "../screens/ExerciseFlow/ExerciseDetailScreen";

const Stack = createNativeStackNavigator();

const ExerciseStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="ExerciseList" component={ExerciseScreen} />
		<Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
	</Stack.Navigator>
);

export default ExerciseStack;
