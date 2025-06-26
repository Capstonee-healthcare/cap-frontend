// App.tsx
import React, { useEffect, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/config/firebase";

import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignUpScreen from "./src/screens/Auth/SignUpScreen";
import TermsAndConditionsScreen from "./src/screens/Auth/Termsandconditions";
import AppNavigator from "./src/screens/Auth/navigation/AppNavigator";

// ✅ Create a context to allow child screens to update terms state
export const TermsContext = createContext<{
  setTermsAccepted: (v: boolean) => void;
}>({
  setTermsAccepted: () => {},
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const accepted = await AsyncStorage.getItem("termsAccepted");
          setTermsAccepted(accepted === "true");
        } catch (e) {
          console.error("Error reading termsAccepted:", e);
          setTermsAccepted(false);
        }
      } else {
        setTermsAccepted(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading || (user && termsAccepted === null)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <TermsContext.Provider value={{ setTermsAccepted }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : !termsAccepted ? (
            <Stack.Screen name="Terms" component={TermsAndConditionsScreen} />
          ) : (
            <Stack.Screen name="Home" component={AppNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TermsContext.Provider>
  );
}
