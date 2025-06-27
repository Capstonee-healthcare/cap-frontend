import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DetectionIntroScreen() {
	const navigation = useNavigation<any>(); // 👈 bypass TypeScript checks

	const handleContinue = () => {
		navigation.navigate("NeckExerciseDetection"); // 👈 works fine now
	};


	return (
		<ImageBackground
			// source={require("../../../assets/your-image.png")} // Replace with your image path
			style={styles.background}
		>
			<View style={styles.overlay} />

			<View style={styles.card}>
				<Text style={styles.title}>
					Pre-Setup Guide for Camera Placement & Audio
				</Text>

				<Text style={styles.description}>
					Place your camera at eye level with good lighting and a clear view of
					your upper body. 
				</Text>

				<Text style={styles.description}>
					Keep your device stable and your face clearly visible. Avoid strong
					backlight.
				</Text>

				<TouchableOpacity style={styles.button} onPress={handleContinue}>
					{/* <Ionicons name="chevron-forward" size={18} color="white" /> */}
					<Text style={styles.buttonText}>Continue</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	card: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		width: "85%",
		alignItems: "center",
		elevation: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		color: "#444",
		textAlign: "center",
		marginBottom: 10,
	},
	button: {
		flexDirection: "row",
		backgroundColor: "#1E90FF",
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 30,
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 6,
	},
});
