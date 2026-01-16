import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function BotaoEquipe() {
  const router = useRouter();

  return (
    <View className="absolute top-10 right-5 z-10">
      <Pressable
        onPress={() => router.push("/equipe")}
        className="bg-transparent p-2 rounded-full shadow"
      >
        <Feather name="users" size={24} color="white" />
      </Pressable>
    </View>
  );
}
