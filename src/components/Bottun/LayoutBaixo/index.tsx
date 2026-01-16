import { View, Text, Pressable, Animated } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef } from "react";

export default function LayoutBaixo() {
  const router = useRouter();
  const pathname = usePathname();

  // animações individuais
  const scaleHome = useRef(new Animated.Value(1)).current;
  const scaleComidas = useRef(new Animated.Value(1)).current;
  const scaleMapa = useRef(new Animated.Value(1)).current;
  const scalePolos = useRef(new Animated.Value(1)).current;
  const scaleCrono = useRef(new Animated.Value(1)).current;

  const animate = (scale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      className="absolute bottom-0 w-full bg-[#05011a]"
    >
      <View className="flex-row justify-evenly py-3">
        
        {/* HOME */}
        <Animated.View style={{ transform: [{ scale: scaleHome }] }}>
          <Pressable
            className="items-center"
            onPress={() => {
              animate(scaleHome);
              router.push("/");
            }}
          >
            <Feather
              name="home"
              size={24}
              color={pathname === "/" ? "#ea580c" : "#fff"}
            />
            <Text
              className={`text-xs font-montserrat-bold mt-1 ${
                pathname === "/" ? "text-orange-600" : "text-white"
              }`}
            >
              Home
            </Text>
          </Pressable>
        </Animated.View>

        {/* COMIDAS */}
        <Animated.View style={{ transform: [{ scale: scaleComidas }] }}>
          <Pressable
            className="items-center"
            onPress={() => {
              animate(scaleComidas);
              router.push("/comidas");
            }}
          >
            <MaterialIcons
              name="restaurant"
              size={24}
              color={pathname === "/comidas" ? "#ea580c" : "#fff"}
            />
            <Text
              className={`text-xs font-montserrat-bold mt-1 ${
                pathname === "/comidas" ? "text-orange-600" : "text-white"
              }`}
            >
              Comidas Gigantes
            </Text>
          </Pressable>
        </Animated.View>

        {/* MAPA */}
        <Animated.View style={{ transform: [{ scale: scaleMapa }] }}>
          <Pressable
            className="items-center"
            onPress={() => {
              animate(scaleMapa);
              router.push("/mapa");
            }}
          >
            <Feather
              name="map"
              size={24}
              color={pathname === "/mapa" ? "#ea580c" : "#fff"}
            />
            <Text
              className={`text-xs font-montserrat-bold mt-1 ${
                pathname === "/mapa" ? "text-orange-600" : "text-white"
              }`}
            >
              Turismo
            </Text>
          </Pressable>
        </Animated.View>

        {/* POLOS */}
        <Animated.View style={{ transform: [{ scale: scalePolos }] }}>
          <Pressable
            className="items-center"
            onPress={() => {
              animate(scalePolos);
              router.push("/polos");
            }}
          >
            <MaterialIcons
              name="festival"
              size={24}
              color={pathname === "/polos" ? "#ea580c" : "#fff"}
            />
            <Text
              className={`text-xs font-montserrat-bold mt-1 ${
                pathname === "/polos" ? "text-orange-600" : "text-white"
              }`}
            >
              Polos Juninos
            </Text>
          </Pressable>
        </Animated.View>

        {/* CRONOGRAMA */}
        <Animated.View style={{ transform: [{ scale: scaleCrono }] }}>
          <Pressable
            className="items-center"
            onPress={() => {
              animate(scaleCrono);
              router.push("/cronograma");
            }}
          >
            <Feather
              name="calendar"
              size={24}
              color={pathname === "/cronograma" ? "#ea580c" : "#fff"}
            />
            <Text
              className={`text-xs font-montserrat-bold mt-1 ${
                pathname === "/cronograma" ? "text-orange-600" : "text-white"
              }`}
            >
              Cronograma
            </Text>
          </Pressable>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}
