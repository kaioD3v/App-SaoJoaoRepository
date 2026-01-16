import React from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";

export interface SectionTabsProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  polos: { code: number; nome: string; handle?: string }[];
  onSelect: (polo: { code: number; nome: string; handle?: string }) => void;
}

export function SectionTabs({ selected, setSelected, polos, onSelect }: SectionTabsProps) {
  if (polos.length === 0) {
    return <ActivityIndicator size="large" color="#ea580c" className="mt-4" />;
  }

  return (
    <View className="py-2">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {polos.map((polo, index) => (
          <Pressable
            key={polo.code}
            onPress={() => {
              setSelected(index);
              onSelect(polo);
            }}
            className="mx-3 items-center"
          >
            <Text className={`text-lg font-montserrat ${selected === index ? "text-white" : "text-gray-400"}`}>
              {polo.nome}
            </Text>
            {selected === index && <View className="h-1 w-full bg-white rounded-full mt-1" />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
