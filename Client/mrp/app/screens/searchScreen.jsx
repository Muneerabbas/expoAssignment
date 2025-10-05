import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../config.js";

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

export default function SearchScreen() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setEvents([]);
      const response = await fetch(
        `${API_BASE_URL}/api/events/search?q=${searchItem}`
      );
      const jsondata = await response.json();
      if (jsondata.success) {
        setEvents(jsondata.data);
        console.log(jsondata.data);
        setIsLoading(false);
        setSearchItem("");
      } else {
        // console.error("Failed to fetch events");
        alert("No events found");
        setIsLoading(false);
      }
    } catch (error) {
      //   console.error("Error fetching events:", error);
      setIsLoading(false);
    }
  };

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });
  const handleSearchPress = async () => {
    fetchEvents();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <TextInput
            placeholder="Search events..."
            value={searchItem}
            onChangeText={setSearchItem}
            style={styles.searchInput}
          />
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity onPress={handleSearchPress}>
              <Ionicons name="search" size={24} color="#000" />
            </TouchableOpacity>
          
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#5B338D" />
          ) : (
            <FlatList
              data={events}
              keyExtractor={(item) => item.id}
              renderItem={({ item = {} }) => (
                <EventCard
                  item={item}
                  onPress={() =>
                    router.push(`/screens/detailsScreen?id=${item.id}`)
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
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
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    fontFamily: "Poppins-Regular",
    padding: 8,
    fontSize: 14,
    marginRight: 8,
  },
});
