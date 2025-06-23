import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ImageSourcePropType,
} from "react-native";

interface Props {
	title: string;
	subtitle: string;
	image: ImageSourcePropType;
	onPress: () => void;
}

const ExerciseCard = ({ title, subtitle, image, onPress }: Props) => (
	<TouchableOpacity style={styles.card} onPress={onPress}>
		<Image source={image} style={styles.image} />
		<View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 16,
		margin: 10,
		borderRadius: 10,
		elevation: 2,
	},
	image: {
		width: 50,
		height: 50,
		marginRight: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 14,
		color: "gray",
	},
});

export default ExerciseCard;
