// src/navigation/VideosStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoLibraryScreen from "../screens/ExerciseFlow/VideoLibraryScreen";
import ExerciseDetailScreen from "../screens/ExerciseFlow/ExerciseDetailScreen";

const Stack = createNativeStackNavigator();

const VideosStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="VideoLibraryMain" component={VideoLibraryScreen} />
		<Stack.Screen name="VideoExerciseDetail" component={ExerciseDetailScreen} />
	</Stack.Navigator>
);

export default VideosStack;
