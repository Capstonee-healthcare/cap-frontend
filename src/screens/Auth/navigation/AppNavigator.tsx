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

import HomeScreen from "../../chatfeature/Homescreen";  // Example: Home with Logout
import AIChatScreen from "../../chatfeature/AIChatScreen";
import MapsNavigation from "./MapsNavigation";
import DetectionStack from "../../../navigation/DetectionStack"
import ExerciseStack from "../../../navigation/ExerciseStack";
import VideosStack from "../../../navigation/VideosStack"; // 🔥 Changed from ExerciseStack to VideosStack
import CustomTabBar from "../../../components/CustomTabBar"; // 🔥 Add this import

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
		<Tab.Navigator 
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <CustomTabBar {...props} />} // 🔥 Add this line
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="AIChat" component={AIChatScreen} />
			<Tab.Screen name="Maps" component={MapsNavigation} />
			<Tab.Screen name="Detection" component={DetectionStack} />
			<Tab.Screen name="Videos" component={VideosStack} />
		</Tab.Navigator>
	);
}
