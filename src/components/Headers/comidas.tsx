import { View, Text, Dimensions } from "react-native";
import Constants from "expo-constants";

const { height: screenHeight } = Dimensions.get("window");

export function HeaderComidas() {
  const statusBarHeight = Constants.statusBarHeight;
  const headerHeight = screenHeight * 0.18;

  return (
    <View
      className="w-full relative bg-transparent overflow-hidden justify-center items-center"
      style={{ height: headerHeight, paddingTop: statusBarHeight + 8 }}
    >
      <View className="mt-6 items-center">
        <Text className="text-white text-3xl font-montserrat-extrabold">
          COMIDAS GIGANTES
        </Text>
      </View>
    </View>
  );
}
