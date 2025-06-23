// src/screens/ExerciseScreen.tsx
import React from "react";
import { ScrollView, View } from "react-native";
import ExerciseCard from "../../components/ExerciseCard";

const ExerciseScreen = ({ navigation }: any) => {
	return (
		<ScrollView>
			<View style={{ marginTop: 40 }}>
				<ExerciseCard
					title="Shoulder"
					subtitle="Mobility & Strength"
					image={require("../../../assets/shoulder.png")}
					onPress={() =>
						navigation.navigate("ExerciseDetail", { category: "shoulder" })
					}
				/>
			</View>
			<ExerciseCard
				title="Biceps"
				subtitle="Tone and Build"
				image={require("../../../assets/shoulder.png")}
				onPress={() =>
					navigation.navigate("ExerciseDetail", { category: "biceps" })
				}
			/>
			<ExerciseCard
				title="Stretching"
				subtitle="Flexibility"
				image={require("../../../assets/shoulder.png")}
				onPress={() =>
					navigation.navigate("ExerciseDetail", { category: "stretching" })
				}
			/>
		</ScrollView>
	);
};

export default ExerciseScreen;
