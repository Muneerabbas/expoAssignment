import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../config.js";
// const events = [
//   {
//     id: "1",
//     title: "Pritish Narula Comedy Show",
//     date: "2025-11-15",
//     time: "19:00",
//     location: "Mumbai, India",
//     price: 799,
//     image: "https://placehold.co/300x200?text=Comedy",
//   },
//   {
//     id: "2",
//     title: "TechFest Pune",
//     date: "2025-12-01",
//     time: "10:00",
//     location: "Pune, India",
//     price: 499,
//     image: "https://placehold.co/300x200?text=TechFest",
//   },
// ];
// const router = useRouter();
const EventCard = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.card}>
      <Image
        source={{
          uri: item.posterUrl,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.text}>
        {item?.date} · {item?.time}
      </Text>
      <Text style={styles.text}>{item?.location}</Text>
      <Text style={styles.price}>₹{item?.price}</Text>
    </View>
  </TouchableOpacity>
);

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events`);
      const jsondata = await response.json();
      if (jsondata.success) {
        setEvents(jsondata.data);
        console.log(jsondata.data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.headerText}>Upcoming Events</Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity
              onPress={() => router.push("/screens/searchScreen")}
            >
              <Ionicons name="search" size={24} color="#000" />
            </TouchableOpacity>
          
          </View>
        </View>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setEvents([]);

                fetchEvents();
              }}
            />
          }
          renderItem={({ item = {} }) => (
            <EventCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/screens/detailsScreen",
                  params: { id: item.id },
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
  },
  text: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins-Regular",
  },
  price: {
    marginTop: 8,
    fontSize: 15,
    color: "#5B338D",
    fontFamily: "Poppins-Bold",
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
});
