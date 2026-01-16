import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

interface Props {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void
}

export default function IconRow({ icon, label }: Props) {
  return (
    <View className="flex-row items-center bg-transparent rounded-xl p-4 mb-4">
      <MaterialIcons name={icon} size={25} color="#ea580c" />
      <Text className="ml-4 text-slate-100 font-montserrat-bold text-3xl">{label}</Text>
    </View>
  );
}
