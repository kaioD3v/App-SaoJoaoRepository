import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { LocaisProps } from "../../../app/mapa";

interface CardProps {
  dados: LocaisProps;
  onPress?: () => void; // ⬅️ nova prop opcional
}

export function Card({ dados, onPress }: CardProps) {
  function getCategoriaInfo(id: string) {
    switch (id) {
      case "Restaurantes":
        return { nome: "Restaurantes", icone: <Ionicons name="restaurant" size={20} color="#f59e0b" /> };
      case "Pontos Culturais":
        return { nome: "Pontos Culturais", icone: <Ionicons name="musical-notes" size={20} color="#3b82f6" /> };
      case "Polos Juninos":
        return { nome: "Polos Juninos", icone: <MaterialCommunityIcons name="party-popper" size={20} color="#ef4444" /> };
      case "Comidas Gigantes":
        return { nome: "Comidas Gigantes", icone: <Ionicons name="fast-food" size={20} color="#10b981" /> };
      case "Supermercados":
        return { nome: "Supermercado", icone: <FontAwesome name="shopping-cart" size={20} color="#6b7280" /> };
      case "Shoppings":
        return { nome: "Shoppings", icone: <FontAwesome name="building" size={20} color="#8b5cf6" /> };
      default:
        return { nome: "Outro", icone: <Ionicons name="help-circle" size={20} color="#9ca3af" /> };
    }
  }

  const categoria = getCategoriaInfo(dados.classificacaoID);

  return (
    <Pressable onPress={onPress} className="bg-zinc-800 rounded-2xl shadow-lg w-80 m-3 overflow-hidden">
      <Image source={{ uri: dados.image }} className="h-44 w-full" resizeMode="cover" />
      <View className="p-4">
        <View className="flex-row items-center mb-1">
          {categoria.icone}
          <Text className="text-sm text-gray-300 ml-2">{categoria.nome}</Text>
        </View>
        <Text className="text-lg font-montserrat-bold text-white">{dados.descricao}</Text>
        <Text className="text-sm font-montserrat text-gray-400 mt-1">
          {dados.resumo.length > 100 ? dados.resumo.slice(0, 100) + "..." : dados.resumo}
        </Text>

        <View className="flex flex-row items-center mt-2">
          <FontAwesome name="map-marker" size={18} color="#1e3a8a" />
          <Text className="text-xs font-montserrat text-gray-300 ml-2">{dados.endereco}</Text>
        </View>

        <View className="flex flex-row items-center mt-2">
          <Ionicons name="time" size={18} color="#1e3a8a" />
          <Text className="text-xs font-montserrat text-emerald-600 ml-2">
            {dados.dias_funcionamento} ({dados.horario_de_inicio} - {dados.horario_de_fim})
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
