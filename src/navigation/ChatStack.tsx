// src/navigation/ChatStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AIChatScreen from "../screens/chatfeature/AIChatScreen";

const Stack = createNativeStackNavigator();

const ChatStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="AIChatMain" component={AIChatScreen} />
	</Stack.Navigator>
);

export default ChatStack;
