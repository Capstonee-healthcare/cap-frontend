import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DExerciseListScreen() {
	const navigation = useNavigation<any>(); // 👈 skip TS error

	const handleNext = () => {
		navigation.navigate("ProgramDetail"); // 👈 navigate to next screen
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>ExerciseListScreen</Text>
			<Button title="Next" onPress={handleNext} />
		</View>
	);
}
