import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Banner } from "../components/Buttons/BannerReutilizavel";
import { FloatingCard } from "../components/Cards/CardFlutuante";
import VoltarHomeButton from "../components/Buttons/VoltarBotao";
import LayoutBaixo from "../components/Bottun/LayoutBaixo";
import { SectionPesquisa } from "../components/Sections/SectionPesquisa";
import { HeaderPolos } from "../components/Headers/polos";

export default function Polos() {
  const [selectedPolo, setSelectedPolo] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [polos, setPolos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("http://192.168.0.5:5000/polo")
      .then((res) => res.json())
      .then((data) =>
        setPolos(data.map((item: any, index: number) => ({ ...item, id: index + 1 })))
      )
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPolos = polos.filter((item) =>
    item.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => (
    <>
      <Banner
        image={{ uri: item.urlimagem }}
        onPress={() => setSelectedPolo(item.id)}
        title={item.nome}
        subtitle="Polos Juninos"
        overlayImage={require("../assets/casa.png")}
      />
      <FloatingCard visible={selectedPolo === item.id} onClose={() => setSelectedPolo(null)}>
        <Image
          source={{ uri: item.urlimagem }}
          className="w-full h-40 rounded-xl mb-3"
          resizeMode="cover"
        />
        <Text className="text-white text-xl mb-2 font-montserrat-bold">{item.nome}</Text>
        <Text className="text-gray-400 mb-3 font-montserrat">{item.descricao}</Text>

        <View className="mt-3 flex-row items-center justify-between w-full">
          <Pressable
            className="bg-orange-700 px-3 py-2 rounded-lg"
            onPress={() => {
              router.push({
                pathname: "/mapa",
                params: {
                  latitude: item.latitude,
                  longitude: item.longitude,
                  nome: item.nome,
                },
              });
              setSelectedPolo(null);
            }}
          >
            <Text className="text-white font-montserrat-bold">Ver Localização</Text>
          </Pressable>

          <Pressable
            className="bg-[#1f0146] px-3 py-2 rounded-lg"
            onPress={() => {
              router.push({
                pathname: "/cronograma",
                params: {
                  polo: item.code, // envia o code do polo
                },
              });
              setSelectedPolo(null);
            }}
          >
            <Text className="text-white font-montserrat-bold">Ver Cronograma</Text>
          </Pressable>
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
        data={filteredPolos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <VoltarHomeButton />
            <HeaderPolos />
            <SectionPesquisa value={search} onChangeText={setSearch} />
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 90,  }} 
        className="flex-1"// espaçamento interno
        showsVerticalScrollIndicator={false} // esconde barra de rolagem
      />
      <LayoutBaixo />
    </View>
  );
}
