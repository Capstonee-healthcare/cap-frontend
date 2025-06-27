import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DetectionStackParamList } from "../../navigation/DetectionStack"; 
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";

const DExerciseDetailScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<DetectionStackParamList>>();

	const equipment = [
		{
			name: "Chair",
			image: require("../../../assets/screen2mlmodel/2Sfullneck.png"),
		},
		{
			name: "Phone Holder",
			image: require("../../../assets/screen2mlmodel/2Sfullneck.png"),
		},
	];

	return (
		<ScrollView style={styles.container}>
			<Image
				source={require("../../../assets/screen2mlmodel/neckstretching.png")}
				style={styles.mainImage}
			/>

			<View style={styles.infoContainer}>
				<Text style={styles.title}>Neck Mobility - Beginner</Text>
				<Text style={styles.subtext}>Duration – 1Min</Text>

				<TouchableOpacity
					style={styles.startButton}
					onPress={() => navigation.navigate("DetectionIntro")}
				>
					<Text style={styles.startText}>Start</Text>
				</TouchableOpacity>

				<Text style={styles.description}>
					This beginner neck mobility program focuses on gently improving neck
					flexibility and reducing stiffness caused by prolonged screen time,
					poor posture, or stress. 
				</Text>

				<Text style={styles.sectionTitle}>Equipments Required</Text>

				<View style={styles.equipmentRow}>
					{equipment.map((item, index) => (
						<View key={index} style={styles.equipmentItem}>
							<Image source={item.image} style={styles.equipmentImage} />
							<Text style={styles.equipmentName}>{item.name}</Text>
						</View>
					))}
				</View>

				<Text style={styles.sectionTitle}>Helps With</Text>
				<Text style={styles.sectionText}>
					• Neck stiffness and tightness{"\n"}• Improving posture and alignment
					{"\n"}• Reducing mild cervical pain and tension{"\n"}• Increasing neck
					mobility and flexibility
				</Text>

				<Text style={styles.sectionTitle}>Precautions</Text>
				<Text style={styles.sectionText}>
					Avoid sudden jerks. Perform exercises slowly and in a pain-free range.
					{"\n"}
					Consult a professional if dizziness, sharp pain, or tingling occurs.
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	mainImage: {
		width: "100%",
		height: 180,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	infoContainer: {
		padding: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 6,
	},
	subtext: {
		fontSize: 14,
		color: "#666",
		marginBottom: 12,
	},
	startButton: {
		backgroundColor: "#28C7E1",
		paddingVertical: 10,
		borderRadius: 25,
		alignItems: "center",
		marginBottom: 16,
	},
	startText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	description: {
		fontSize: 14,
		marginBottom: 16,
	},
	sectionTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 8,
	},
	equipmentRow: {
		flexDirection: "row",
		marginBottom: 16,
	},
	equipmentItem: {
		alignItems: "center",
		marginRight: 20,
	},
	equipmentImage: {
		width: 50,
		height: 50,
		borderRadius: 10,
		marginBottom: 4,
	},
	equipmentName: {
		fontSize: 12,
		textAlign: "center",
	},
	
	sectionText: {
		fontSize: 14,
		color: "#555",
		lineHeight: 22,
	}
});

export default DExerciseDetailScreen;
