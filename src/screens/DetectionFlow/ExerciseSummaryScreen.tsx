import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation,useRoute } from "@react-navigation/native";


export default function ExerciseSummaryScreen() {
	const navigation = useNavigation<any>();
    const route = useRoute<any>();
		const {
			correctCount = 0,
			incorrectCount = 0,
			duration = "1:00",
		} = route.params || {};


	return (
		<View style={styles.container}>
			{/* <View style={styles.header}>
				<Text style={styles.headerText}>Program details</Text>
			</View> */}
			

			<View style={styles.content}>
				<Image
					source={require("../../../assets/Badge1.png")}
					style={styles.badgeImage}
					resizeMode="contain"
				/>

				<Text style={styles.congrats}>Kudos!</Text>
				<Text style={styles.subtext}>
					Great job completing today’s session!
				</Text>

				<View style={styles.statsRow}>
					<View style={styles.statBox}>
						<MaterialCommunityIcons name="target" size={28} color="#76c893" />
						<Text style={styles.statValue}>
							{Math.max(
								0,
								Math.round(
									(correctCount / (correctCount + incorrectCount || 1)) * 100
								)
							)}
							%
						</Text>
						<Text style={styles.statLabel}>Accuracy</Text>
					</View>
					<View style={styles.statBox}>
						<Ionicons name="hourglass" size={28} color="#53bdeb" />
						<Text style={styles.statValue}>{duration}</Text>
						<Text style={styles.statLabel}>Duration</Text>
					</View>
					<View style={styles.statBox}>
						<MaterialCommunityIcons
							name="close-circle"
							size={28}
							color="#f76b6b"
						/>
						<Text style={styles.statValue}>{incorrectCount}</Text>
						<Text style={styles.statLabel}>Mistakes</Text>
					</View>
				</View>

				<View style={styles.notesBox}>
					<Text style={styles.notesTitle}>Tips:</Text>
					<Text style={styles.note}>• Maintain slow, controlled movement.</Text>
					<Text style={styles.note}>• Stretch gently, avoid jerks.</Text>
					<Text style={styles.note}>
						• Follow up after 3–4 sessions or 1 week.
					</Text>
				</View>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("Home")} // or any other screen
			>
				<Text style={styles.buttonText}>Finish</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
       
	},
	
	header: {
		backgroundColor: "#45c7d1",
		paddingVertical: 16,
		alignItems: "center",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	headerText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	content: {
		flex: 1,
		padding: 20,
		alignItems: "center",
	},
	badge: {
		backgroundColor: "#e94560",
		width: 64,
		height: 64,
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
	},
	badgeText: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
	},
	congrats: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginTop: 8,
	},
	subtext: {
		color: "#777",
		marginBottom: 20,
		textAlign: "center",
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 24,
	},
	statBox: {
		flex: 1,
		alignItems: "center",
	},
	statValue: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		marginTop: 4,
	},
	statLabel: {
		color: "#555",
		fontSize: 12,
	},
	notesBox: {
		backgroundColor: "#f2f2f2",
		padding: 16,
		borderRadius: 12,
		width: "100%",
	},
	notesTitle: {
		fontWeight: "bold",
		marginBottom: 8,
	},
	note: {
		fontSize: 14,
		color: "#444",
		marginBottom: 4,
	},
	button: {
		backgroundColor: "#36c5e0",
		paddingVertical: 14,
		borderRadius: 30,
		margin: 20,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	badgeImage: {
		width: 100,
		height: 100,
		marginBottom: 12,
	},
});