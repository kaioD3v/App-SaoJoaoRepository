import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';

type InfoSectionProps = {
  nomeEsquerda: string;
  nomeDireita: string;
  leftIcon?: keyof typeof Feather.glyphMap;
  rightIcon?: keyof typeof Feather.glyphMap;
};

export default function Section({
  nomeEsquerda,
  nomeDireita,
  leftIcon = "user",
  rightIcon = "bell",
}: InfoSectionProps) {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-transparentborder-b border-gray-200">
      {/* Parte esquerda */}
      <View className="flex-row items-center space-x-4">
        <Feather name={leftIcon} size={30} color="#ea580c" />
        <Text className="ml-2 text-slate-100 font-montserrat-bold text-xl">{nomeEsquerda}</Text>
      </View>

      {/* Parte direita */}
    <Pressable onPress={() => router.push('/polos')}>
      <View className="flex-row items-center">
        <Feather name={rightIcon} size={20} color="#ea580c" />
        <Text className="ml-1 text-orange-600 font-montserrat-bold text-base">{nomeDireita}</Text>
      </View>
    </Pressable>

    </View>
  );
}
