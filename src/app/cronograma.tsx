import React, { useState, useEffect, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SectionTabs } from "../components/Sections/SectionConogramaTabs";
import { SectionData } from "../components/Sections/SectionConogramaDia";
import { SectionPesquisa } from "../components/Sections/SectionPesquisa";
import { Banner } from "../components/Buttons/BannerReutilizavel";
import { FloatingCard } from "../components/Cards/CardFlutuante";
import LayoutBaixo from "../components/Bottun/LayoutBaixo";
import { Header } from "../components/Headers/globalHeader";
import { useRouter } from "expo-router";


export default function Cronograma() {
  const params = useLocalSearchParams();

  const [data, setData] = useState<any>(null);
  const [selectedPoloIndex, setSelectedPoloIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2025-05-31");
  const [searchQuery, setSearchQuery] = useState("");
  const [openBannerId, setOpenBannerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const polos = data?.polos || [];
  const atracoes = data?.atracoes || [];
  const selectedPolo = polos[selectedPoloIndex];

  useEffect(() => {
    fetch("http://192.168.0.5:5000/cronograma")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
        if (params.polo && json.polos) {
          const idx = json.polos.findIndex((p: any) => p.code === Number(params.polo));
          if (idx >= 0) setSelectedPoloIndex(idx);
        }
      })
      .catch(() => setLoading(false));
  }, [params.polo]);

  // banners do polo selecionado
  const banners = useMemo(() => {
    if (!selectedPolo) return [];
    const list: any[] = [];
    atracoes.forEach((atracao: any) => {
      atracao.exibicoes.forEach((ex: any) => {
        if (ex.fk === selectedPolo.code) {
          list.push({
            id_atracao: String(atracao.code),
            title: atracao.nome,
            description: atracao.descricao,
            image: atracao.urlimagem ? { uri: atracao.urlimagem } : require("../assets/cantor.png"),
            overlayImage: require("../assets/cantor.png"),
            day: ex.dia,
            address: ex.endereco,
            datetime: ex.horario,
            classificacao: "Atrações",
          });
        }
      });
    });
    return list;
  }, [atracoes, selectedPolo]);

  // banners filtrados pelo dia selecionado
  const bannersDoDia = useMemo(() => {
    return banners.filter(b => b.day === selectedDate);
  }, [banners, selectedDate]);

  // banners da pesquisa (abrangente, sem limitar ao dia)
  const searchedBanners = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return banners.filter(b =>
      b.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q)
    );
  }, [banners, searchQuery]);

  const openBanner = banners.find(b => b.id_atracao === openBannerId);

  if (loading) {
      return (
        <View className="flex-1 justify-center items-center bg-[#05011a]">
          <ActivityIndicator size="large" color="#ea580c" />
        </View>
      );
    }
   if (!data) return <Text className="text-slate-100 text-center mt-10">Erro ao carregar dados.</Text>;

  return (
    <View className="flex-1 bg-[#05011a]">
      <Header name="CRONOGRAMA" />

      <SectionData
        date={selectedDate}
        onDateChange={setSelectedDate}
        exibicoes={atracoes
          .flatMap((atracao: any) => atracao.exibicoes)
          .filter((ex: any) => ex.fk === selectedPolo?.code)} // filtra apenas o polo selecionado
      />

      <SectionTabs
        polos={polos}
        selected={selectedPoloIndex}
        setSelected={setSelectedPoloIndex}
        onSelect={() => {}}
      />

      <SectionPesquisa value={searchQuery} onChangeText={setSearchQuery} />

      <FlatList
        data={searchQuery ? searchedBanners : bannersDoDia} // se pesquisa ativa, mostra resultados, senão só o dia
        keyExtractor={item => item.id_atracao}
        renderItem={({ item }) => (
          <Banner
            image={item.image}
            overlayImage={item.overlayImage}
            title={item.title}
            subtitle={item.classificacao}
            onPress={() => {
              setOpenBannerId(item.id_atracao);
              setSelectedDate(item.day); // vai para o dia da apresentação
              setSearchQuery(""); // reseta pesquisa
            }}
          />
        )}
          ListEmptyComponent={
    <Text className="text-white text-center mt-10 font-montserrat">
      Sem nenhuma atração neste dia.
    </Text>
          }
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 90,  }} 
        className="flex-1"// espaçamento interno
        showsVerticalScrollIndicator={false} // esconde barra de rolagem
      />

{openBanner && (
  <FloatingCard visible={!!openBanner} onClose={() => setOpenBannerId(null)}>
    {openBanner.image && (
      <Image source={openBanner.image} className="w-full h-40 rounded-xl mb-3" resizeMode="cover" />
    )}
    {openBanner.title && <Text className="text-white text-xl mb-2 font-montserrat-bold">{openBanner.title}</Text>}
    {openBanner.description && <Text className="text-gray-400 font-montserrat">{openBanner.description}</Text>}
    {selectedPolo && openBanner.datetime && (
      <View className="mt-3 flex-row items-center justify-between w-full">
        <Pressable
          className="bg-orange-700 px-3 py-2 rounded-lg"
          onPress={() => {
            router.push({
              pathname: "/mapa",
              params: {
                latitude: selectedPolo.latitude,
                longitude: selectedPolo.longitude,
                nome: openBanner.title,
              },
            });
            setOpenBannerId(null);
          }}
        >
          <Text className="text-white font-montserrat-bold">Ver Localização</Text>
        </Pressable>
        <Text className="text-gray-300 font-montserrat">{openBanner.datetime}</Text>
      </View>
    )}
  </FloatingCard>
)}

      <LayoutBaixo />
    </View>
  );
}