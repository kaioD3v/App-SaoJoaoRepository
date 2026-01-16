import { View, Text, Pressable, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Props {
  name: string;
  searchText: string;
  setSearchText: (text: string) => void;
}

const statusBarHeight = Constants.statusBarHeight;

export function Header({ name, searchText, setSearchText }: Props) {

  function AoClicarNaSeta() {
    router.push("/");
  }

  return (
    <View className="bg-[#05011a] pt-6 px-8 pb-8" style={{ paddingTop: statusBarHeight }}>
      <View className="flex-row items-center justify-between mb-4">
        <Pressable onPress={AoClicarNaSeta} className="w-10 h-10 rounded-full justify-center items-center">
          <Feather name="arrow-left" size={26} color="#ffffff" />
        </Pressable>
        <Text className="text-white text-3xl font-montserrat-bold">{name}</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 mt-4">
        <Feather name="search" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-2 text-gray-800 font-montserrat"
          placeholder="Pesquisar..."
          placeholderTextColor="gray"
          value={searchText ?? ""}
          onChangeText={setSearchText}
        />
        {searchText?.length > 0 && (
          <Pressable onPress={() => setSearchText("")}>
            <Feather name="x-circle" size={20} color="gray" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
