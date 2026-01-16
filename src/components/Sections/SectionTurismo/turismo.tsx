import { View, Text, Pressable } from 'react-native';

interface Props{
    name: string;
    size: "text-lg" | "text-xl" | "text-2xl";
    action: () => void;

}

export function Section({name, size, action}: Props) {
 return (
   <View className='w-full flex-row items-center justify-between px-4'>
    <Text className={`${size} font-montserrat-bold my-4 self-start color-white`}>{name}</Text>
   </View>
  );
}