import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
	title: string;
	image: any;
	exercisesCount: number;
	duration: string;
	level: string;
	onPress: () => void;
};

const ExerciseCard: React.FC<Props> = ({
	title,
	image,
	level,
	exercisesCount,
	duration,
	onPress,
}) => {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<Image source={image} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.level}>🏅 {level}</Text>
				<Text style={styles.text}>🧍 {exercisesCount} Exercises</Text>
				<Text style={styles.text}>⏳ {duration}</Text>
				
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: "#EAF3FB",
		padding: 12,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 12,
	},
	image: {
		width: 65,
		height: 65,
		borderRadius: 10,
		marginRight: 12,
	},
	content: {
		flex: 1,
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 4,
	},
	text: {
		fontSize: 13,
		color: "#555",
	},
	level: {
		marginTop: 4,
		fontSize: 16,
		color: "#499",
		// fontWeight: "600",
        fontWeight:"bold",
	},
});

export default ExerciseCard;
