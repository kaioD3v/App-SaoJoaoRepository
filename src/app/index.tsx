import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image, ActivityIndicator, Pressable } from "react-native";
import { Banner } from "../components/Buttons/BannerReutilizavel";
import { FloatingCard } from "../components/Cards/CardFlutuante";
import LayoutBaixo from "../components/Bottun/LayoutBaixo";
import { HeaderWallpaper } from "../components/Wallpaper";
import Section from "../components/Sections/SectionHomePolos";
import Button from "../components/Buttons/PolosHomeBotao";
import NomeEIcon from "../components/Sections/SectionHomeDestaques";
import Header from "../components/Headers/index";
import { BotaoEquipe } from "../components/Buttons/EquipeButton";
import { useRouter } from "expo-router";

interface Evento {
  code: number;
  nome: string;
  descricao: string;
  urlimagem: string;
  inicio: string;
  horario: string;
  latitude?: string;
  longitude?: string;
  tipo: "evento";
}

interface Polo {
  code: number;
  nome: string;
  descricao: string;
  urlimagem: string;
  inicio?: string;
  fim?: string;
  latitude?: string;
  longitude?: string;
  tipo: "polo";
}

type Item = Evento | Polo;

export default function Index() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.0.5:5000/inicio");
        const data = await res.json();

        const eventos: Evento[] = data.eventos.map((e: any) => ({
          ...e,
          tipo: "evento",
        }));

        const polos: Polo[] = data.polos.map((p: any) => ({
          ...p,
          tipo: "polo",
        }));

        // Ordem fixa
        const ordemFixa = [
          "Pátio de Eventos Luiz Gonzaga",
          "Polo Azulão",
          "Cuscuz Gigante",
          "Festival do Caldo de Cana",
        ];

        const itensOrdenados: Item[] = ordemFixa
          .map((nome) => {
            const poloEncontrado = polos.find((p) => p.nome.includes(nome));
            if (poloEncontrado) return poloEncontrado;
            const eventoEncontrado = eventos.find((e) => e.nome.includes(nome));
            return eventoEncontrado || null;
          })
          .filter((item): item is Item => !!item && !!item.urlimagem);

        setItems(itensOrdenados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Item }) => {
    const isPolo = item.tipo === "polo";
    const nomeOuTitulo = item.nome;
    const subtitle = isPolo ? "Polos Juninos" : "Comidas Gigantes";
    const overlayImage = isPolo ? require("../assets/casa.png") : require("../assets/prato.png");

    return (
      <>
        <Banner
          image={{ uri: item.urlimagem }}
          onPress={() => setSelectedId(item.code)}
          title={nomeOuTitulo}
          subtitle={subtitle}
          overlayImage={overlayImage}
        />

        <FloatingCard visible={selectedId === item.code} onClose={() => setSelectedId(null)}>
          <Image
            source={{ uri: item.urlimagem }}
            className="w-full h-40 rounded-xl mb-3"
            resizeMode="cover"
          />
          <Text className="text-white font-montserrat-bold text-xl mb-2">{nomeOuTitulo}</Text>
          <Text className="text-gray-400 font-montserrat mb-3">{item.descricao}</Text>

          <View className="mt-3 flex-row items-center justify-between w-full">
            {item.latitude && item.longitude && (
              <Pressable
                className="bg-orange-700 px-3 py-2 rounded-lg"
                onPress={() =>
                  router.push({
                    pathname: "/mapa",
                    params: {
                      latitude: item.latitude,
                      longitude: item.longitude,
                      nome: nomeOuTitulo,
                    },
                  })
                }
              >
                <Text className="text-white font-montserrat-bold">Ver Localização</Text>
              </Pressable>
            )}

            {isPolo ? (
              <Pressable
                className="bg-[#1f0146] px-3 py-2 rounded-lg ml-2"
                onPress={() =>
                  router.push({
                    pathname: "/cronograma",
                    params: { polo: item.code },
                  })
                }
              >
                <Text className="text-white font-montserrat-bold">Ver Cronograma</Text>
              </Pressable>
            ) : (
              item.inicio &&
              item.horario && (
                <Text className="text-gray-300 font-montserrat">
                  {item.inicio} às {item.horario}
                </Text>
              )
            )}
          </View>
        </FloatingCard>
      </>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05011a]">
        <ActivityIndicator size="large" color="#ea580c" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#05011a]">
      <HeaderWallpaper />

      <FlatList
        data={items}
        keyExtractor={(item) => item.code.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Header />
            <BotaoEquipe />
            <Section
              nomeDireita="VER TUDO"
              nomeEsquerda="DESCUBRA OS POLOS"
              leftIcon="mouse-pointer"
              rightIcon="menu"
            />
            <Button />
            <NomeEIcon icon="info" label="DESTAQUES" onPress={() => {}} />
          </>
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 90, // aumenta para o FlatList subir acima do LayoutBaixo
        }}
        className="flex-1"
        showsVerticalScrollIndicator={false} // esconde barra de rolagem
      />

      <LayoutBaixo />
    </View>
  );
}
