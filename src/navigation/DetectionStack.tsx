import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BodyPartSelectScreen from "../screens/DetectionFlow/BodyPartSelectScreen";
import ExerciseListScreen from "../screens/DetectionFlow/DExerciseListScreen";
import ExerciseDetailScreen from "../screens/DetectionFlow/DExerciseDetailScreen";
import DetectionScreen from "../screens/DetectionFlow/DetectionScreen";

// Simple param list type
export type DetectionStackParamList = {
	BodyPartSelect: undefined;
	ProgramList: undefined;
	ProgramDetail: undefined;
	NeckExerciseDetection: undefined;
};

// Pass type to stack
const Stack = createNativeStackNavigator<DetectionStackParamList>();

export default function DetectionStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="BodyPartSelect" component={BodyPartSelectScreen} />
			<Stack.Screen name="ProgramList" component={ExerciseListScreen} />
			<Stack.Screen name="ProgramDetail" component={ExerciseDetailScreen} />
			<Stack.Screen name="NeckExerciseDetection" component={DetectionScreen} />
		</Stack.Navigator>
	);
}
