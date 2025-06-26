// // src/screens/Auth/navigation/AppNavigator.tsx

// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import AIChatScreen from "../../chatfeature/AIChatScreen";
// import HomeScreen from "../../chatfeature/peofilescreen";
// import MapsNavigation from "./MapsNavigation";

// const Tab = createBottomTabNavigator();

// export default function AppNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="AI Chat" component={AIChatScreen} />
//       <Tab.Screen name="Maps" component={MapsNavigation} /> {/* ✅ Nested stack */}
//     </Tab.Navigator>
//   );
// }
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../chatfeature/peofilescreen";  // Example: Home with Logout
import AIChatScreen from "../../chatfeature/AIChatScreen";
import MapsNavigation from "./MapsNavigation";
import DetectionStack from "../../../navigation/DetectionStack"
import ExerciseStack from "../../../navigation/ExerciseStack";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="AI Chat" component={AIChatScreen} />
			<Tab.Screen name="Maps" component={MapsNavigation} />
			<Tab.Screen name="Detection" component={DetectionStack} />
			<Tab.Screen name="Video" component={ExerciseStack} />
		</Tab.Navigator>
	);
}
