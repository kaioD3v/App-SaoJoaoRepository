import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Banner } from "../components/Buttons/BannerReutilizavel";
import { HeaderComidas } from "../components/Headers/comidas";
import { FloatingCard } from "../components/Cards/CardFlutuante";
import VoltarHomeButton from "../components/Buttons/VoltarBotao";
import LayoutBaixo from "../components/Bottun/LayoutBaixo";
import { SectionPesquisa } from "../components/Sections/SectionPesquisa";

export default function Comidas() {
  const [selectedComida, setSelectedComida] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [comidas, setComidas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://192.168.0.5:5000/eventos")
      .then((res) => res.json())
      .then((data) => {
        const dataWithId = data.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        setComidas(dataWithId);
      })
      .catch((err) => console.error("Erro ao buscar comidas:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredComidas = comidas.filter((item) =>
    (item.nome ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes((search ?? "").toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => (
    <>
      <Banner
        image={item.urlimagem ? { uri: item.urlimagem } : require("../assets/placeholder.png")}
        onPress={() => setSelectedComida(item.id)}
        title={item.nome ?? ""}
        subtitle="Comidas Gigantes"
        overlayImage={require("../assets/cuscuz.png")}
      />
      <FloatingCard
        visible={selectedComida === item.id}
        onClose={() => setSelectedComida(null)}
      >
        <Image
          source={item.urlimagem ? { uri: item.urlimagem } : require("../assets/placeholder.png")}
          className="w-full h-40 rounded-xl mb-3"
          resizeMode="cover"
        />
        <Text className="text-white text-xl mb-2 font-montserrat-bold">{item.nome ?? ""}</Text>
        <Text className="text-gray-400 mb-3 font-montserrat">{item.descricao ?? ""}</Text>
        <View className="mt-3 flex-row items-center justify-between w-full">
          <Pressable
            className="bg-orange-700 px-3 py-2 rounded-lg"
            onPress={() => {
              router.push({
                pathname: "/mapa",
                params: {
                  latitude: item.latitude,
                  longitude: item.longitude,
                  nome: item.nome ?? "",
                },
              });
              setSelectedComida(null);
            }}
          >
            <Text className="text-white font-montserrat-bold">Ver Localização</Text>
          </Pressable>
          <Text className="text-gray-300 font-montserrat">
            {(item.inicio ? new Date(item.inicio).toLocaleDateString() : "")} - {(item.horario ?? "")}
          </Text>
        </View>
      </FloatingCard>
    </>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05011a]">
        <ActivityIndicator size="large" color="#ea580c" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#05011a]">
      <FlatList
        data={filteredComidas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <VoltarHomeButton />
            <HeaderComidas />
            <SectionPesquisa value={search} onChangeText={setSearch} />
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 90 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      />
      <LayoutBaixo />
    </View>
  );
}
