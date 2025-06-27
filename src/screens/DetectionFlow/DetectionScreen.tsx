
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import {
	Camera,
	Face,
	FaceDetectionOptions,
} from "react-native-vision-camera-face-detector";
import {
	useCameraDevice,
	useCameraPermission,
} from "react-native-vision-camera";
import * as Speech from "expo-speech";

type Phase =
	| "start"
	| "movingLeft"
	| "holdingLeft"
	| "movingToCenterFromLeft"
	| "movingRight"
	| "holdingRight"
	| "movingToCenterFromRight";

export default function DetectionScreen({ navigation }: any) {
	
	const { hasPermission } = useCameraPermission();
	const { width, height } = useWindowDimensions();
	const device = useCameraDevice("front");

	const [phase, setPhase] = useState<Phase>("start");
	const [angleDelta, setAngleDelta] = useState<number>(0);
	const [arrow, setArrow] = useState<"left" | "right" | "center">("center");
	const [correctCount, setCorrectCount] = useState<number>(0);
	const [incorrectCount, setIncorrectCount] = useState<number>(0);
	const [feedbackMsg, setFeedbackMsg] = useState<string>("");

	const [timer, setTimer] = useState<number>(60);
	const targetReps = 10;

	const holdTimer = useRef<NodeJS.Timeout | null>(null);
	const lastSpoken = useRef<string>("");
	const incorrectFlag = useRef(false);
	const repCooldown = useRef(false);
	const arrivedCenter = useRef(false);
	const uprightError = useRef(false);
	const noFaceFlag = useRef(false);

	const yawRef = useRef(0);

	const speak = (message: string) => {
		if (lastSpoken.current !== message) {
			Speech.speak(message);
			lastSpoken.current = message;
		}
	};

	const resetHold = () => {
		if (holdTimer.current) clearTimeout(holdTimer.current);
		holdTimer.current = null;
	};

	const startHold = (onSuccess: () => void) => {
		resetHold();
		if (timer <= 0) return;
		holdTimer.current = setTimeout(() => {
			if (timer <= 0) return;
			onSuccess();
			resetHold();
		}, 3000);
	};

	const faceDetectionOptions: FaceDetectionOptions = {
		performanceMode: "accurate",
		landmarkMode: "all",
		contourMode: "none",
		classificationMode: "all",
		trackingEnabled: false,
		windowWidth: width,
		windowHeight: height,
		autoScale: true,
	};

	const handleFacesDetection = (faces: Face[]) => {
		if (timer <= 0) return;

		try {
			if (faces?.length > 0) {
				if (noFaceFlag.current) noFaceFlag.current = false;

				const face = faces[0];
				const yaw = -(face.yawAngle ?? 0);
				const pitch = face.pitchAngle ?? 0;

				yawRef.current = yaw;

				const pitchOk = pitch > -15 && pitch < 15;
				const isHoldingPhase =
					phase === "holdingLeft" || phase === "holdingRight";

				if (!pitchOk && !isHoldingPhase) {
					setArrow("center");
					setAngleDelta(999);
					setFeedbackMsg("Please keep your face upright");
					speak("Please keep your face upright");
					resetHold();
					uprightError.current = true;
					return;
				} else {
					if (uprightError.current) {
						uprightError.current = false;
						if (phase === "holdingLeft") {
							speak("Hold this position");
							startHold(() => {
								setPhase("movingToCenterFromLeft");
								speak("Good, now return to center");
							});
						} else if (phase === "holdingRight") {
							speak("Hold this position");
							startHold(() => {
								setPhase("movingToCenterFromRight");
								speak("Good, now return to center");
							});
						}
					}
				}

				if (uprightError.current) return;

				setFeedbackMsg("");

				let targetYaw = 0;

				if (phase === "start" || phase === "movingLeft") {
					targetYaw = -30;
					setArrow("left");
				} else if (
					phase === "movingToCenterFromLeft" ||
					phase === "movingRight"
				) {
					targetYaw = 30;
					setArrow("right");
				} else if (phase === "movingToCenterFromRight") {
					targetYaw = 0;
					setArrow("center");
				}

				const delta = Math.abs(yaw - targetYaw);
				setAngleDelta(delta);

				let movement: "left" | "right" | "center" = "center";
				if (yaw < -15) movement = "left";
				else if (yaw > 15) movement = "right";

				const isIncorrect =
					(phase === "start" && movement === "right") ||
					(phase === "movingLeft" && movement === "right") ||
					(phase === "movingRight" && movement === "left");

				if (isIncorrect && !incorrectFlag.current) {
					setIncorrectCount((prev) => prev + 1);
					speak("Incorrect movement, try again");
					setPhase("start");
					resetHold();

					incorrectFlag.current = true;
					setTimeout(() => {
						incorrectFlag.current = false;
					}, 4000); // 1 second cooldown
					return;
				}

				switch (phase) {
					case "start":
					case "movingLeft":
						if (yaw < -25) {
							setPhase("holdingLeft");
							speak("Hold this position");
							startHold(() => {
								setPhase("movingToCenterFromLeft");
								speak("Good, now return to center");
							});
						}
						break;

					case "movingToCenterFromLeft":
						if (yaw > -5 && yaw < 5) {
							setPhase("movingRight");
						}
						break;

					case "movingRight":
						if (yaw > 25) {
							setPhase("holdingRight");
							speak("Hold this position");
							startHold(() => {
								setPhase("movingToCenterFromRight");
								speak("Good, now return to center");
							});
						}
						break;

					case "movingToCenterFromRight":
						if (
							yaw > -5 &&
							yaw < 5 &&
							!repCooldown.current &&
							!arrivedCenter.current
						) {
							setPhase("start");
							setCorrectCount((prev) => prev + 1);
							speak("Repetition complete. Well done!");
							repCooldown.current = true;
							arrivedCenter.current = true;

							setTimeout(() => {
								repCooldown.current = false;
							}, 1500);
						}
						break;
				}
			} else {
				setAngleDelta(0);
				setArrow("center");
				setFeedbackMsg("No face detected");

				if (!noFaceFlag.current) {
					speak("Face not detected");
					noFaceFlag.current = true;
				}
			}
		} catch (error) {
			console.error("Error in face detection:", error);
		}
	};

	useEffect(() => {
		const isHoldingPhase = phase === "holdingLeft" || phase === "holdingRight";

		if (phase === "start") {
			speak("Please turn your head to the left");
		} else if (phase === "movingRight" && !isHoldingPhase) {
			speak("Please turn your head to the right");
		} else if (phase === "movingToCenterFromRight") {
			arrivedCenter.current = false;
		}
	}, [phase]);

	useEffect(() => {
		if (
			phase === "start" ||
			phase === "movingLeft" ||
			phase === "movingRight" ||
			phase === "movingToCenterFromLeft" ||
			phase === "movingToCenterFromRight"
		) {
			incorrectFlag.current = false;
		}
	}, [phase]);

	useEffect(() => {
		if (timer <= 0) {
			speak("Exercise complete! Well done!");
			setTimeout(() => {
				Speech.stop();
			}, 3000);
			
			setTimeout(() => {
				navigation.navigate("ExerciseSummary", {
					correctCount,
					incorrectCount,
					duration: "1:00",
				});;
			}, 5000); // Wait 3s before navigating
			return;
		}

		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timer]);

	if (!hasPermission)
		return <Text>Camera permission is required to use this feature.</Text>;
	if (device == null) return <Text>Camera device not found.</Text>;

	const arrowSymbol = arrow === "left" ? "⬅️" : arrow === "right" ? "➡️" : "⬆️";

	const stepNumber =
		phase === "start" || phase === "movingLeft"
			? 1
			: phase === "holdingLeft"
			? 2
			: phase === "movingRight" || phase === "movingToCenterFromLeft"
			? 3
			: 4;

	const progressPercent = Math.min((correctCount / targetReps) * 100, 100);

	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;
	const timerDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;

	return (
		<View style={StyleSheet.absoluteFill}>
			<Camera
				style={StyleSheet.absoluteFill}
				device={device}
				isActive={true}
				faceDetectionCallback={handleFacesDetection}
				faceDetectionOptions={faceDetectionOptions}
			/>
			<View style={styles.feedbackContainer}>
				<Text style={styles.feedbackHeading}>Neck Rotation Exercise</Text>
				<Text style={styles.timerText}>
					⏳ {timer > 0 ? timerDisplay : "00:00"}
				</Text>
				<Text style={styles.stepText}>Step {stepNumber} of 4</Text>
				<Text style={styles.arrowText}>{arrowSymbol}</Text>
				{/* <Text style={styles.feedbackText}>
					🎯 Angle delta: {angleDelta === 999 ? "--" : angleDelta.toFixed(1)}°
				</Text> */}

				<Text style={styles.yawIndicator}>
					Yaw: {yawRef.current.toFixed(1)}°
				</Text>
				<View style={styles.yawBar}>
					<View
						style={[
							styles.yawFill,
							{
								width: `${Math.min(
									Math.max((yawRef.current + 45) * (100 / 90), 0),
									100
								)}%`,
							},
						]}
					/>
				</View>

				{feedbackMsg !== "" && (
					<Text style={styles.feedbackError}>{feedbackMsg}</Text>
				)}

				<View style={styles.progressBar}>
					<View
						style={[styles.progressFill, { width: `${progressPercent}%` }]}
					/>
				</View>
				<Text style={styles.progressLabel}>
					{correctCount}/{targetReps} reps
				</Text>
				<View style={styles.countContainer}>
					<Text style={styles.countText}>✔ Correct: {correctCount}</Text>
					<Text style={styles.countText}>❌ Incorrect: {incorrectCount}</Text>
				</View>
				{timer <= 0 && (
					<Text style={styles.completeText}>🎉 Exercise complete!</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	feedbackContainer: {
		position: "absolute",
		bottom: 40,
		left: 20,
		right: 20,
		backgroundColor: "rgba(0,0,0,0.7)",
		borderRadius: 16,
		padding: 16,
		alignItems: "center",
	},
	feedbackHeading: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
	timerText: {
		color: "#FFD700",
		fontSize: 18,
		marginBottom: 4,
	},
	stepText: {
		color: "#87CEEB",
		fontSize: 18,
		marginBottom: 4,
	},
	arrowText: {
		fontSize: 48,
		marginBottom: 8,
	},
	feedbackText: {
		color: "#90ee90",
		fontSize: 16,
		marginBottom: 10,
		textAlign: "center",
	},
	yawIndicator: {
		color: "#fff",
		fontSize: 16,
		marginBottom: 6,
	},
	yawBar: {
		height: 8,
		backgroundColor: "#444",
		borderRadius: 4,
		overflow: "hidden",
		width: "100%",
		marginBottom: 10,
	},
	yawFill: {
		height: "100%",
		backgroundColor: "#00BFFF",
	},
	feedbackError: {
		color: "red",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	progressBar: {
		height: 10,
		backgroundColor: "#444",
		borderRadius: 5,
		overflow: "hidden",
		width: "100%",
		marginTop: 10,
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#00FF7F",
	},
	progressLabel: {
		color: "#fff",
		marginTop: 6,
	},
	countContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 8,
	},
	countText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	completeText: {
		color: "#00FF7F",
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
	},
});
