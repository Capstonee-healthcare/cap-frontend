import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const pointsByZone: Record<string, { label: string; image: any }[]> = {
	Neck: [
		{
			label: "Full Neck",
			image: require("../../../assets/screen2mlmodel/2Sfullneck.png"),
		},
		{
			label: "Left Neck",
			image: require("../../../assets/screen2mlmodel/2Sleftneck.png"),
		},
		{
			label: "Right Neck",
			image: require("../../../assets/screen2mlmodel/2Srightneck.png"),
		},
		{
			label: "Middle Neck",
			image: require("../../../assets/screen2mlmodel/2Smiddleneck.png"),
		},
	],
	Knee: [
		{ label: "Upper Knee", image: require("../../../assets/neck.png") },
		{ label: "Lower Knee", image: require("../../../assets/neck.png") },
	],
	"Back pain": [
		{ label: "Upper Back", image: require("../../../assets/neck.png") },
		{ label: "Lower Back", image: require("../../../assets/neck.png") },
	],
	Elbow: [
		{ label: "Outer Elbow", image: require("../../../assets/neck.png") },
		{ label: "Inner Elbow", image: require("../../../assets/neck.png") },
	],
};

type Props = {
	zone: string;
	selectedPoint: string | null;
	onSelectPoint: (point: string) => void;
};

const BodyPointSelector: React.FC<Props> = ({
	zone,
	selectedPoint,
	onSelectPoint,
}) => {
	const points = pointsByZone[zone] || [];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Select body point</Text>
			<View style={styles.grid}>
				{points.map((point, index) => {
					const isSelected = selectedPoint === point.label;
					return (
						<TouchableOpacity
							key={index}
							style={[styles.option, isSelected && styles.selectedOption]}
							onPress={() => onSelectPoint(point.label)}
						>
							<Image source={point.image} style={styles.image} />
							<Text style={styles.label}>{point.label}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { marginTop: 20 },
	title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	option: {
		width: "47%",
		backgroundColor: "#F2F9FF",
		borderRadius: 10,
		padding: 10,
		marginBottom: 12,
		alignItems: "center",
	},
	selectedOption: {
		borderColor: "#1E90FF",
		borderWidth: 2,
		backgroundColor: "#E6F0FF",
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	label: {
		marginTop: 5,
		textAlign: "center",
		fontSize: 14,
	},
});

export default BodyPointSelector;
