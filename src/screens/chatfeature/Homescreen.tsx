import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

export default function HomeScreen() {
  const [username, setUsername] = useState("User");
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const calendarHeight = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const userRef = doc(firestore, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.username) {
            setUsername(data.username);
          }
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFeelingPress = (feeling: string) => {
    Alert.alert(`You selected: ${feeling}`);
  };

  const toggleFullCalendar = () => {
    const toValue = showFullCalendar ? 0 : 300;
    Animated.timing(calendarHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowFullCalendar(!showFullCalendar);
  };

  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
  const todayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const generateMonthDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: offset + daysInMonth }, (_, i) =>
      i < offset ? "" : `${i - offset + 1}`
    );
  };

  const monthDates = generateMonthDates();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitial}>
            {username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.headerText}>{username}</Text>
      </View>

      {/* Feelings */}
      <View style={styles.feelingContainer}>
        <Text style={styles.feelingText}>How are you feeling today?</Text>
        <View style={styles.emojiRow}>
          <Text style={styles.emoji} onPress={() => handleFeelingPress("🔥")}>
            🔥
          </Text>
          <Text style={styles.emoji} onPress={() => handleFeelingPress("😖")}>
            😖
          </Text>
          <Text style={styles.emoji} onPress={() => handleFeelingPress("😁")}>
            😁
          </Text>
          <Text style={styles.emoji}>+</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.buttonIcon}>📖</Text>
            <Text style={styles.buttonText}>My Programs</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Maps" ,{screen:"NearbyTherapistScreen"})
          }
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.buttonIcon}>📍</Text>
            <Text style={styles.buttonText}>Nearby Therapist</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.streakHeaderRow}>
        <TouchableOpacity onPress={toggleFullCalendar}>
          <Text style={styles.showFullCalendarText}>
            {showFullCalendar ? "Hide Full Calendar" : "Show Full Calendar"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.streakTitle}>Daily Streak</Text>
      </View>

      <View style={styles.streakRow}>
        {weekdays.map((day, index) => (
          <View key={index} style={styles.streakItem}>
            <Text style={styles.streakDay}>{day}</Text>
            <View
              style={[
                styles.streakCircle,
                todayIndex === index && styles.streakCircleActive,
              ]}
            >
              <Text style={styles.streakNumberText}>{weekDates[index]}</Text>
            </View>
          </View>
        ))}
      </View>

      <Animated.View style={[styles.monthCalendar, { height: calendarHeight }]}>
        <View style={styles.monthWeekdays}>
          {weekdays.map((day, idx) => (
            <Text key={idx} style={styles.monthDayLabel}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.monthDatesContainer}>
          {monthDates.map((date, idx) => {
            const isToday = date !== "" && parseInt(date, 10) === today.getDate();
            return (
              <View key={idx} style={styles.monthDateItem}>
                <View
                  style={[
                    styles.monthDateCircle,
                    isToday && styles.monthDateCircleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.monthDateText,
                      isToday && styles.monthDateTextActive,
                    ]}
                  >
                    {date}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>

      {/* Welcome Box */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Welcome to Kyntra!</Text>
        <Text style={styles.welcomeMessage}>
          Let's start building healthy habits—one session at a time. No pressure,
          just progress.
        </Text>
      </View>

      {/* Start Exercise */}
      <TouchableOpacity style={styles.exerciseButton}>
        <Text style={styles.exerciseButtonText}>
          Start your first exercise →
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileCircle: {
    backgroundColor: "#6A5ACD",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  feelingContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  feelingText: {
    fontSize: 16,
    marginBottom: 10,
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  emoji: {
    fontSize: 24,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 20,
    padding: 20,
    width: "48%",
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  streakHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  showFullCalendarText: {
    color: "#30CFCF",
    fontWeight: "bold",
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  streakRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  streakItem: {
    alignItems: "center",
    width: 40,
  },
  streakDay: {
    fontSize: 12,
    marginBottom: 5,
  },
  streakCircle: {
    backgroundColor: "#E0E0E0",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  streakCircleActive: {
    backgroundColor: "#AEEA00",
  },
  streakNumberText: {
    fontWeight: "bold",
  },
  monthCalendar: {
    overflow: "hidden",
    marginBottom: 20,
  },
  monthWeekdays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  monthDayLabel: {
    width: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  monthDatesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  monthDateItem: {
    width: "14.28%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  monthDateCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  monthDateCircleActive: {
    backgroundColor: "#AEEA00",
  },
  monthDateText: {
    fontSize: 12,
  },
  monthDateTextActive: {
    fontWeight: "bold",
    color: "#000",
  },
  welcomeBox: {
    backgroundColor: "#E8F0FE",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 14,
  },
  exerciseButton: {
    backgroundColor: "#30CFCF",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  exerciseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "red",
  },
});