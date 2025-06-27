import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TermsContext } from "../../../App"; // Adjust path if needed
import { useNavigation } from "@react-navigation/native";

export default function TermsAndConditionsScreen() {
  const navigation = useNavigation();
  const { setTermsAccepted } = useContext(TermsContext);

  const handleUnderstand = async () => {
    try {
      await AsyncStorage.setItem("termsAccepted", "true");
      setTermsAccepted(true); // ✅ Triggers App.tsx to rerender
    } catch (e) {
      console.error("Failed to save terms acceptance:", e);
      Alert.alert("Error", "Could not save your response.");
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Terms and Conditions</Text>
        </View>
      </View>

      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Important information</Text>

          <Text style={styles.text}>
            This app provides <Text style={styles.bold}>general guidance</Text>{" "}
            and does not address{" "}
            <Text style={styles.bold}>serious conditions</Text>. Always consult
            a doctor for emergencies.
          </Text>
        </ScrollView>

        <Pressable style={styles.button} onPress={handleUnderstand}>
          <Text style={styles.buttonText}>I understood</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4DD0E1" },
  headerWrapper: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: { marginRight: 8 },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 15, marginBottom: 12, color: "#333" },
  bold: { fontWeight: "bold" },
  button: {
    backgroundColor: "#4DD0E1",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
