import { View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Props {
  name: string;
}

const statusBarHeight = Constants.statusBarHeight;

export function Header({ name }: Props) {

    function AoClicarNaSeta (){
        router.push("/")
    }

  return (
    <View className="bg-[#05011a] pb-8 pt-6 px-8 flex-row items-center justify-between" style={{ paddingTop: statusBarHeight }}>
      
      {/* Botão com ícone de seta (voltar) */}
      <Pressable onPress={AoClicarNaSeta} className="w-10 h-10 rounded-full justify-center items-center">
        <Feather name="arrow-left" size={26} color="#ffffff" />
      </Pressable>

      {/* Título centralizado */}
      <Text className="text-white text-3xl mt-3 font-montserrat-bold">{name}</Text>

      {/* Botão com ícone de informação */}
      <Pressable className="w-10 h-12 rounded-full justify-center items-center">
        <Feather name="info" size={26} color="#05011a" />
      </Pressable>
    </View>
  );
}