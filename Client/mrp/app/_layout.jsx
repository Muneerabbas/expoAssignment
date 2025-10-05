import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const events = [
  {
    id: "1",
    title: "Pritish Narula Comedy Show",
    date: "2025-11-15",
    time: "19:00",
    location: "Mumbai, India",
    price: 799,
    image: "https://placehold.co/300x200?text=Comedy",
  },
  {
    id: "2",
    title: "TechFest Pune",
    date: "2025-12-01",
    time: "10:00",
    location: "Pune, India",
    price: 499,
    image: "https://placehold.co/300x200?text=TechFest",
  },
];

const EventCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item?.image }} style={styles.image} />
    <Text style={styles.title}>{item?.title}</Text>
    <Text style={styles.text}>
      {item?.date} · {item?.time}
    </Text>
    <Text style={styles.text}>{item?.location}</Text>
    <Text style={styles.price}>₹{item?.price}</Text>
  </View>
);

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item = {} }) => <EventCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});
