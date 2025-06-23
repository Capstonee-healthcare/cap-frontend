import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import DetectionScreen from "../screens/DetectionScreen";
import DetectionStack from "./DetectionStack";
import ExerciseStack from "./ExerciseStack";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
	<Tab.Navigator screenOptions={{ headerShown: false }}>
		<Tab.Screen name="Detection" component={DetectionStack} />
		<Tab.Screen name="Exercise" component={ExerciseStack} />
	</Tab.Navigator>
);

export default AppNavigator;
