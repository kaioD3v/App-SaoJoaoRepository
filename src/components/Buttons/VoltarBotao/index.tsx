import React from "react";
import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function VoltarHomeButton() {
  const router = useRouter();

  return (
    <View className="absolute top-16 left-4 z-50">
      <Pressable
        onPress={() => router.push("/")} // volta para a Home
        className="p-2"
      >
        <Feather name="arrow-left" size={24} color="white" />
      </Pressable>
    </View>
  );
}
