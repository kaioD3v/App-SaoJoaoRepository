import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

interface SectionPesquisaProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SectionPesquisa({ value, onChangeText }: SectionPesquisaProps) {
  return (
    <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 py-2 mx-4 my-5 h-15">
      <Feather name="search" size={20} color="gray" />
      <TextInput
        className="flex-1 ml-2 text-gray-800 font-montserrat"
        placeholder="Pesquisar..."
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
