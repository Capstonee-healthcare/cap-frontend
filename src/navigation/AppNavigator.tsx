import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ChatStack from "./ChatStack";
import MapsStack from "./MapsStack";
import DetectionStack from "./DetectionStack";
import VideosStack from "./VideosStack";
import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
	<Tab.Navigator 
		screenOptions={{ 
			headerShown: true,
		}}
		tabBar={(props) => <CustomTabBar {...props} />}
	>
		<Tab.Screen 
			name="Home" 
			component={HomeStack}
			options={{
				tabBarLabel: "Home",
			}}
		/>
		<Tab.Screen 
			name="AIChat" 
			component={ChatStack}
			options={{
				tabBarLabel: "AI Chat",
			}}
		/>
		<Tab.Screen 
			name="Maps" 
			component={MapsStack}
			options={{
				tabBarLabel: "Maps",
			}}
		/>
		<Tab.Screen 
			name="Detection" 
			component={DetectionStack}
			options={{
				tabBarLabel: "Detection",
			}}
		/>
		<Tab.Screen 
			name="Videos" 
			component={VideosStack}
			options={{
				tabBarLabel: "Videos",
			}}
		/>
	</Tab.Navigator>
);

export default AppNavigator;
