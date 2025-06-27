import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BodyPartSelectScreen from "../screens/DetectionFlow/BodyPartSelectScreen";
import ExerciseListScreen from "../screens/DetectionFlow/DExerciseListScreen";
import ExerciseDetailScreen from "../screens/DetectionFlow/DExerciseDetailScreen";
import DetectionScreen from "../screens/DetectionFlow/DetectionScreen";
import DetectionIntroScreen from "../screens/DetectionFlow/DetectionIntroScreen";
import ExerciseSummaryScreen from "../screens/DetectionFlow/ExerciseSummaryScreen";

// Simple param list type
export type DetectionStackParamList = {
	Exercise: undefined;
	ProgramList: { point: string };
	ProgramDetail: { program: any };
	NeckExerciseDetection: undefined;
	DetectionIntro: undefined;
	ExerciseSummary: undefined;
};

// Pass type to stack
const Stack = createNativeStackNavigator<DetectionStackParamList>();

export default function DetectionStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name="Exercise"
				component={BodyPartSelectScreen}
				// options={{ title: "Exercise" }}
			/>
			<Stack.Screen name="ProgramList" component={ExerciseListScreen} />
			<Stack.Screen name="ProgramDetail" component={ExerciseDetailScreen} />
			<Stack.Screen
				name="DetectionIntro"
				component={DetectionIntroScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="NeckExerciseDetection" component={DetectionScreen} />
			<Stack.Screen
				name="ExerciseSummary"
				component={ExerciseSummaryScreen}
				options={{
					title: "Summary", // Optional custom title
					headerStyle: {
						backgroundColor: "#3EC5D6", // Blue color
					},
					headerTintColor: "#fff", // White text/icons
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
		</Stack.Navigator>
	);
}
