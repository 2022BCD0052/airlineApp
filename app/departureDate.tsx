import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DepartureDate() {
  const [flightOfferData, setFlightOfferData] = useState<any>({
    departureDate: new Date(),
  });

  const saveDepartureDate = async () => {
    try {
      const departureDate = flightOfferData.departureDate.toISOString().split("T")[0];
      await AsyncStorage.setItem("departureDate", departureDate);
      Alert.alert("Success", `Departure date saved: ${departureDate}`);
    } catch (error) {
      console.error("Error saving departure date:", error);
      Alert.alert("Error", "Failed to save the departure date.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Departure</Text>
        <Pressable onPress={saveDepartureDate} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>

      {/* Calendar View */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day: any) => {
            setFlightOfferData({
              ...flightOfferData,
              departureDate: new Date(day.dateString),
            });
          }}
          markedDates={{
            [flightOfferData.departureDate.toISOString().split("T")[0]]: {
              selected: true,
              selectedColor: "#12B3A8",
              selectedTextColor: "white",
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    height: 100,
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#12B3A8",
    borderRadius: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  calendarContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4, // For shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
