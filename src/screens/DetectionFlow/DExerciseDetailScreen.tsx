import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DExerciseDetailScreen() {
	const navigation = useNavigation<any>();

	const handleNext = () => {
		navigation.navigate("NeckExerciseDetection"); // 👈 navigate to detection
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>ExerciseDetailScreen</Text>
			<Button title="Start Neck Exercise" onPress={handleNext} />
		</View>
	);
}
