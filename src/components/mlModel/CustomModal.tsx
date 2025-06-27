// components/CustomModal.tsx
import React from "react";
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	StyleSheet,
	GestureResponderEvent,
} from "react-native";

type Props = {
	visible: boolean;
	onClose: () => void;
	title?: string;
	emoji?: string;
	description?: string;
	additionalText?: string;
	showButtons?: boolean;
	primaryText?: string;
	secondaryText?: string;
	onPrimaryPress?: (e: GestureResponderEvent) => void;
	onSecondaryPress?: (e: GestureResponderEvent) => void;
};

const CustomModal: React.FC<Props> = ({
	visible,
	onClose,
	title,
	emoji,
	description,
	additionalText,
	showButtons = false,
	primaryText,
	secondaryText,
	onPrimaryPress,
	onSecondaryPress,
}) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={{ fontSize: 16 }}>✕</Text>
					</TouchableOpacity>

					{title && <Text style={styles.modalTitle}>{title}</Text>}
					{emoji && <Text style={styles.emoji}>{emoji}</Text>}
					{description && <Text style={styles.modalText}>{description}</Text>}
					{additionalText && (
						<Text style={styles.modalText}>{additionalText}</Text>
					)}

					{/* ✅ Insert this block below */}
					{showButtons && primaryText && !secondaryText && (
						<TouchableOpacity
							style={styles.btnPrimary}
							onPress={onPrimaryPress}
						>
							<Text style={styles.btnText}>{primaryText}</Text>
						</TouchableOpacity>
					)}

					{showButtons && primaryText && secondaryText && (
						<View style={styles.buttonRow}>
							<TouchableOpacity
								style={styles.btnOutline}
								onPress={onSecondaryPress}
							>
								<Text style={styles.btnText}>{secondaryText}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.btnPrimary}
								onPress={onPrimaryPress}
							>
								<Text style={styles.btnText}>{primaryText}</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		width: "85%",
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	emoji: {
		fontSize: 32,
		textAlign: "center",
		marginBottom: 10,
	},
	modalText: {
		textAlign: "center",
		marginTop: 10,
		color: "#333",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
	btnPrimary: {
		backgroundColor: "#1E90FF",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	btnOutline: {
		borderColor: "#1E90FF",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	btnText: {
		color: "#fff",
		fontWeight: "600",
		textAlign: "center",
	},
});

export default CustomModal;
