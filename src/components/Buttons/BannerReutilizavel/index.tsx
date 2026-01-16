import { View, Pressable, Image, ImageSourcePropType, Text } from "react-native";

interface Props {
  image: ImageSourcePropType;
  onPress?: () => void;
  title?: string;
  subtitle?: string;
  overlayImage?: ImageSourcePropType; // imagem acima do título
}

export function Banner({ image, onPress, title, subtitle, overlayImage }: Props) {
  return (
    <View className="w-full h-36 md:h-60 rounded-2xl mt-2 mb-24">
      <Pressable
        className="w-[92%] self-center h-[187px] rounded-2xl my-2 overflow-hidden"
        onPress={onPress}
      >
        {/* Imagem de fundo */}
        <Image
          source={image}
          className="w-full h-full opacity-50 rounded-2xl"
          resizeMode="cover"
        />

        {/* Container central com ícone + textos */}
        <View className="absolute inset-0 justify-center items-start pl-5">
          {overlayImage && (
            <Image
              source={overlayImage}
              className="w-14 h-14 mb-2"
              resizeMode="contain"
              tintColor={"white"}
            />
          )}

          {title && (
            <Text className="text-white text-2xl md:text-4xl font-montserrat-extrabold">
              {title}
            </Text>
          )}

          {subtitle && (
            <Text className="text-[#fc3507] text-xl md:text-2xl font-montserrat-bold mt-0">
              {subtitle}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}
