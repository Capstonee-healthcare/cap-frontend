import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import BodyPointSelector from "../mlModel/BodyPointSelector";

const zones = [
	{ name: "Neck", image: require("../../../assets/neck.png") },
	{ name: "Knee", image: require("../../../assets/back.png") },
	{ name: "Back pain", image: require("../../../assets/back.png") },
	{ name: "Elbow", image: require("../../../assets/back.png") },
];

const BodyZoneSelector = () => {
	const [selectedZone, setSelectedZone] = useState<string | null>(null);
	const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

	const handleSelectPoint = (point: string) => {
		setSelectedPoint(point);
		console.log("Selected Point:", point); // You can use this to navigate or fetch exercises
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Select body zone</Text>

			<View style={styles.zonesRow}>
				{zones.map((zone, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							setSelectedZone(zone.name);
							setSelectedPoint(null); // Reset when zone changes
						}}
					>
						<Image source={zone.image} style={styles.zoneImage} />
						<Text style={styles.zoneName}>{zone.name}</Text>
					</TouchableOpacity>
				))}
			</View>

			{selectedZone && (
				<BodyPointSelector
					zone={selectedZone}
					selectedPoint={selectedPoint}
					onSelectPoint={handleSelectPoint}
				/>
			)}

			{selectedPoint && (
				<>
					<Text style={styles.selectedText}>
						Selected point: {selectedPoint}
					</Text>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => console.log("Go to next screen")}
					>
						<Text style={styles.nextButtonText}>Next</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
      
};

const styles = StyleSheet.create({
	container: { padding: 16 },
	title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
	zonesRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
	},
	zoneImage: { width: 50, height: 50 },
	zoneName: { textAlign: "center", marginTop: 4 },
	selectedText: {
		marginTop: 20,
		fontSize: 16,
		color: "#1E90FF",
		fontWeight: "600",
	},
	nextButton: {
		marginTop: 20,
		backgroundColor: "#1E90FF",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
	},
	nextButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default BodyZoneSelector;
