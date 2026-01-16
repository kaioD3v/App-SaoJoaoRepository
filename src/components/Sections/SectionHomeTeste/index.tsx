import React from "react";
import { View, ScrollView, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

export default function BarraLateral() {
  const router = useRouter();

  // Lista de botões e suas rotas (nome do arquivo dentro da pasta app/)
  const itens = [
    { label: "Turismo", route: '/turismo' },
    { label: "Polos Juninos", route: '/polosKaio' },
    { label: "Comidas Gigantes", route: '/comidas' },
    { label: "Cronograma", route: '/cronograma' },
  ];

  // Duplicamos os itens para dar a sensação de infinito
  const lista = [...itens];

  return (
    <View className="w-full h-20 bg-transparent">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {lista.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(item.route)}
            className="px-6 py-3 mx-4 rounded-full border border-white"
          >
            <Text className="text-white text-base">{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
