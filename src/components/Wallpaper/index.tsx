// components/Wallpaper.tsx
import React from "react";
import { View, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height: screenHeight } = Dimensions.get("window");

export function HeaderWallpaper() {
  const headerHeight = screenHeight * 0.3; // altura do topo

  return (
    <View className="absolute w-full h-full">
      {/* Imagem no topo */}
      <Image
        source={require('../../assets/palcoboniyo.png')}
        style={{
          width: "100%",
          height: headerHeight,
        }}
        resizeMode="cover"
      />

      {/* Gradiente cobrindo toda a altura da imagem */}
      <LinearGradient
        colors={['transparent', '#05011a']} // do topo da imagem para a cor do fundo
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: headerHeight, // ocupa toda a altura da imagem
        }}
      />

      {/* Fundo abaixo do topo */}
      <View style={{ flex: 1, backgroundColor: "#05011a" }} />
    </View>
  );
}