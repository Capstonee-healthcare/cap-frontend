import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ExerciseCard from "../../components/mlModel/CardsExercise"; // Adjust if needed
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DetectionStackParamList } from "../../navigation/DetectionStack";

const DExerciseListScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<DetectionStackParamList>>();

	const programList = [
		{
			level: "Level 1",
			title: "Neck Exercise",
			image: require("../../../assets/screen2mlmodel/2Sfullneck.png"),
			exercisesCount: 1,
			duration: "1 Min Duration",
		},
		{
			level: "Level 2",
			title: "Neck Exercise",
			image: require("../../../assets/screen2mlmodel/2Sfullneck.png"),
			exercisesCount: 2,
			duration: "2 Min Duration",
		},
		{
			level: "Level 3",
			title: "Neck Exercise",
			image: require("../../../assets/screen2mlmodel/2Sfullneck.png"),
			exercisesCount: 3,
			duration: "3 Min Duration",
		},
		
	];

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.header}>List of Program</Text>

			{programList.map((program, index) => (
				<ExerciseCard
					key={index}
					level={program.level}
					title={program.title}
					image={program.image}
					exercisesCount={program.exercisesCount}
					duration={program.duration}
					onPress={() => navigation.navigate("ProgramDetail", { program })}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	header: {
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 16,
	},
});

export default DExerciseListScreen;
