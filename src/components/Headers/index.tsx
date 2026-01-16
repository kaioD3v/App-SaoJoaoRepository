import { View, Image, Text, Dimensions } from "react-native";
import Constants from "expo-constants";
import { useFonts } from 'expo-font';

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function Header() {
  
  const statusBarHeight = Constants.statusBarHeight;
  const headerHeight = screenHeight * 0.3;

  const textWidth = screenWidth * 0.6;

  return (
    <View
      className="w-full relative bg-transparent overflow-hidden justify-center items-center"
      style={{ height: headerHeight, paddingTop: statusBarHeight + 10 }}
    >
      {/* Texto principal */}
      <Text className="absolute top-12 text-white text-2xl font-montserrat-extrabold text-center z-10">
        Bem vindo ao
      </Text>

      {/* Imagem colada ao texto */}
      <Image
        source={require("../../assets/logosj.png")}
        className="top-30"   // sem distância do texto
        style={{ width: textWidth, height: 100 }}
        resizeMode="contain"
      />

      {/* Dois textos abaixo da imagem */}
      <View className="mt-0 items-center">
        <Text className="text-white text-3xl font-montserrat-bold">#SJDECARUARU</Text>
        <Text className="text-white text-sm font-montserrat">25 de abril até 28 de junho</Text>
      </View>
    </View>
  );
}
