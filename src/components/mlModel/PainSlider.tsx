import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Modal,
	Alert,
	TouchableOpacity,
	Pressable,
} from "react-native";

import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DetectionStackParamList } from "../../navigation/DetectionStack";
import CustomModal from "./CustomModal";

const PainSlider = () => {
	const [painLevel, setPainLevel] = useState<number>(0);
	const [showModal, setShowModal] = useState(false);

	const navigation =
		useNavigation<NativeStackNavigationProp<DetectionStackParamList>>();

	const handleNext = () => {
		if (painLevel <= 6) {
			navigation.navigate("ProgramList", { point: "fromSlider" });
		} else {
			setShowModal(true);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>How intense is the pain right now?</Text>
			<Text style={styles.subtitle}>Rate your pain on a scale of 0–10</Text>

			<Slider
				style={{ width: "100%", height: 40 }}
				minimumValue={0}
				maximumValue={10}
				step={1}
				value={painLevel}
				onValueChange={(val: number) => setPainLevel(val)}
				minimumTrackTintColor="#1E90FF"
				maximumTrackTintColor="#ccc"
				thumbTintColor="#1E90FF"
			/>

			<Text style={styles.value}>{painLevel * 10}%</Text>

			<TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
				<Text style={styles.nextBtnText}>Next</Text>
                
			</TouchableOpacity>

			{/* Modal */}
			<CustomModal
				visible={showModal}
				onClose={() => setShowModal(false)}
				title="Take a pause!!"
				emoji="😟"
				description="We noticed you're experiencing increased pain. For your safety, we recommend stopping your exercises for now and consulting a healthcare professional."
				additionalText="Your safety is our priority. If you're unsure, we can help guide you to the right support."
				primaryText="Find a therapist"
				showButtons
				onPrimaryPress={() => {
					setShowModal(false);
					navigation.getParent()?.navigate("Maps");
				}}
				onSecondaryPress={() => setShowModal(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 0,
		padding: 10,
		backgroundColor: "#EAF3FB",
		borderRadius: 12,
	},
	title: { fontWeight: "bold", fontSize: 16 },
	subtitle: { marginTop: 8, marginBottom: 16 },
	value: {
		textAlign: "right",
		color: "#1E90FF",
		fontWeight: "600",
		marginTop: 4,
	},
	nextBtn: {
		backgroundColor: "#1E90FF",
		padding: 12,
		borderRadius: 10,
		marginTop: 20,
	},
	nextBtnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	modalContent: {
		width: "85%",
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 20,
		alignItems: "center",
		position: "relative",
	},
	closeButton: {
		position: "absolute",
		top: 10,
		right: 14,
		zIndex: 10,
	},
	modalTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
	emoji: { fontSize: 36, marginBottom: 10 },
	modalText: {
		textAlign: "center",
		fontSize: 14,
		marginVertical: 6,
		color: "#444",
	},
	therapistBtn: {
		marginTop: 16,
		backgroundColor: "#000",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
	},
	therapistText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default PainSlider;
