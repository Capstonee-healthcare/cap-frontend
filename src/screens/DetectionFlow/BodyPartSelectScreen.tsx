import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BodyPointSelector from "../../components/mlModel/BodyPointSelector";
import PainSlider from "../../components/mlModel/PainSlider";
import QuestionBlock from "../../components/mlModel/QuestionBlock";
import { DetectionStackParamList } from "../../navigation/DetectionStack";

const zones = [
	{ name: "Neck", image: require("../../../assets/neck.png") },
	{ name: "Knee", image: require("../../../assets/knee.png") },
	{ name: "Back pain", image: require("../../../assets/back.png") },
	{ name: "Elbow", image: require("../../../assets/elbow.png") },
];

const BodyZoneSelector = () => {
	const [selectedZone, setSelectedZone] = useState<string | null>(null);
	const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
	const navigation =
		useNavigation<NativeStackNavigationProp<DetectionStackParamList>>();

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<View style={styles.container}>
				<Text style={styles.heading}>Select body zone</Text>

				<View style={styles.zoneRow}>
					{zones.map((zone, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => setSelectedZone(zone.name)}
						>
							<Image source={zone.image} style={styles.image} />
							<Text style={styles.label}>{zone.name}</Text>
						</TouchableOpacity>
					))}
				</View>

				{selectedZone && (
					<View style={styles.extraContent}>
						<BodyPointSelector
							zone={selectedZone}
							selectedPoint={selectedPoint}
							onSelectPoint={(point) => setSelectedPoint(point)}
						/>
						<PainSlider />
						{/* <QuestionBlock /> */}
					</View>
				)}

				{selectedPoint && (
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() =>
							navigation.navigate("ProgramList", { point: selectedPoint })
						}
					>
						<Text style={styles.nextButtonText}>Next</Text>
					</TouchableOpacity>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContent: {
		paddingBottom: 40,
	},
	container: {
		padding: 20,
	},
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	zoneRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	image: {
		width: 50,
		height: 50,
	},
	label: {
		textAlign: "center",
		marginTop: 5,
	},
	extraContent: {
		marginTop: 20,
	},
	nextButton: {
		backgroundColor: "#1E90FF",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignSelf: "center",
		marginTop: 20,
	},
	nextButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default BodyZoneSelector;
