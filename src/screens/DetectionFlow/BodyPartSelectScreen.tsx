import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BodyPartSelectScreen() {
	const navigation = useNavigation<any>(); // 👈 skip type error

	const handleNext = () => {
		navigation.navigate("ProgramList"); // ✅ works fine
		// Or you can do: navigation.push("ProgramList");
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>BodyPartSelectScreen</Text>
			<Button title="Next" onPress={handleNext} />
		</View>
	);
}
