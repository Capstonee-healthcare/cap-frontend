import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Terms: undefined;
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "SignUp">;

const db = getFirestore();

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        // Real-time listener for user data
        const unsubscribeSnapshot = onSnapshot(doc(db, "users", uid), (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData(null);
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSignUp = async () => {
    try {
      await AsyncStorage.removeItem("termsAccepted");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = userCredential.user;

      // Save email and username to Firestore
      await setDoc(doc(db, "users", uid), {
        email,
        username,
      });

      // App.tsx will navigate to Terms automatically
    } catch (error: any) {
      console.error("Signup Error:", error);
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>📛 Username: {userData.username}</Text>
          <Text style={styles.userText}>📧 Email: {userData.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  userInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  userText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
