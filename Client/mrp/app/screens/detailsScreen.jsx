import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { API_BASE_URL } from "../../config.js";
export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });
  useEffect(() => {
    if (id) {
      const fetchEventDetails = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/events/${id}`);
          const jsonData = await response.json();
          if (jsonData.success) {
            setEvent(jsonData.data);
          }
        } catch (error) {
          console.error("Failed to fetch event details:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEventDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5B338D" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Event not found. ID: {id}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Image source={{ uri: event.posterUrl }} style={styles.posterImage} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#555" />
            <Text style={styles.detailText}>
              {`${event.date} at ${event.time}`}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#555" />
            <Text style={styles.detailText}>
              {event.venue}, {event.location}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={20} color="#555" />
            <Text style={styles.detailText}>
              Organized by {event.organizer}
            </Text>
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>About this event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.price}>{`₹${event.price}`}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#888",
  },
  posterImage: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 20,
    color: "#111",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 15,
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
  separator: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    color: "#111",
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 24,
    fontFamily: "Poppins-Regular",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#FFF",
  },
  price: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#111",
  },
  bookButton: {
    backgroundColor: "#5B338D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  bookButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});
