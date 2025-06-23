import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ExerciseDetailScreen = ({ route, navigation }: any) => {
	const { category } = route.params;
	const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
	const [started, setStarted] = useState(false);

	const videoLinks: Record<string, Record<string, string>> = {
		shoulder: {
			Beginner: "https://www.youtube.com/embed/HCzv84mpNAQ",
			Intermediate: "https://www.youtube.com/embed/iIpxa0WFaTw",
			Advanced: "https://www.youtube.com/embed/QLW9rMyI4ss",
		},
		biceps: {
			Beginner: "https://www.youtube.com/embed/BXH5rW4kp7k",
			Intermediate: "https://www.youtube.com/embed/WZxM2I23UXY",
			Advanced: "https://www.youtube.com/embed/dJSz2Df2AoI",
		},
		stretching: {
			Beginner: "https://www.youtube.com/embed/aT0mGdfzMZA",
			Intermediate: "https://www.youtube.com/embed/_Rn1vnHC3dU",
			Advanced: "https://www.youtube.com/embed/E--RgZrJkAo",
		},
	};

	return (
		<View style={styles.container}>
			{/* Back Button */}
			{!started && (
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backIcon}
				>
					<Ionicons name="arrow-back" size={24} color="#000" />
				</TouchableOpacity>
			)}

			{/* Level Selection */}
			{!started ? (
				<>
					<Text style={styles.title}>Choose a level</Text>
					{Object.keys(videoLinks[category]).map((level) => (
						<Pressable
							key={level}
							style={[
								styles.levelButton,
								selectedLevel === level && styles.selectedLevelButton,
							]}
							onPress={() => setSelectedLevel(level)}
						>
							<Ionicons
								name={
									selectedLevel === level
										? "radio-button-on"
										: "radio-button-off"
								}
								size={22}
								color={selectedLevel === level ? "#6bbf48" : "#ccc"}
							/>
							<Text style={styles.levelText}>{level}</Text>
						</Pressable>
					))}

					<Text style={styles.note}>
						Every expert was once a beginner. You've got this! 💪
					</Text>

					{/* Start Button */}
					{selectedLevel && (
						<TouchableOpacity
							style={styles.startButton}
							onPress={() => setStarted(true)}
						>
							<Ionicons name="play" size={20} color="#fff" />
							<Text style={styles.startText}>Start</Text>
						</TouchableOpacity>
					)}
				</>
			) : (
				<>
					{/* In-video back */}
					<TouchableOpacity
						onPress={() => {
							setStarted(false);
							setSelectedLevel(null);
						}}
						style={styles.backOverlay}
					>
						<Ionicons name="arrow-back" size={24} color="#fff" />
					</TouchableOpacity>

					{/* Video */}
					<WebView
						style={styles.webview}
						javaScriptEnabled={true}
						allowsFullscreenVideo={true}
						source={{
							uri: `${
								videoLinks[category][selectedLevel!]
							}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1`,
						}}
					/>
				</>
			)}
		</View>
	);
};

export default ExerciseDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 50,
		backgroundColor: "#FFF",
	},
	backIcon: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 24,
	},
	levelButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 12,
		marginVertical: 6,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: "#ddd",
	},
	selectedLevelButton: {
		borderColor: "#6bbf48",
		backgroundColor: "#eefaf0",
	},
	levelText: {
		fontSize: 16,
		marginLeft: 12,
		fontWeight: "500",
	},
	note: {
		marginTop: 30,
		textAlign: "center",
		fontSize: 14,
		color: "#444",
	},
	bold: {
		fontWeight: "bold",
		color: "#000",
	},
	startButton: {
		backgroundColor: "#6bbf48",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 12,
		marginTop: 20,
		borderRadius: 24,
	},
	startText: {
		color: "#fff",
		fontSize: 18,
		marginLeft: 8,
	},
	webview: {
		width: width,
		height: height,
		backgroundColor: "#000",
	},
	backOverlay: {
		position: "absolute",
		top: 40,
		left: 16,
		zIndex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 8,
		borderRadius: 20,
	},
});
