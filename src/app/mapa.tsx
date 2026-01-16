import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, ScrollView, Image, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { Header } from "../components/Headers/mapacultural";
import { Section } from "../components/Sections/SectionTurismo/turismo";
import { Card } from "../components/locais/card/Turismo2";
import LayoutBaixo from "../components/Bottun/LayoutBaixo";
import { Localizacao } from "../components/Location/Localizacao/localizacao";

export interface LocaisProps {
  cod: number;
  descricao: string;
  resumo: string;
  endereco: string;
  latitude: number;
  longitude: number;
  image: string;
  dias_funcionamento: string;
  icone: string;
  horario_de_inicio: string;
  horario_de_fim: string;
  classificacaoID: string;
}

export default function Mapa() {
  const [locais, setLocais] = useState<LocaisProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(0.01);
  const [mapReady, setMapReady] = useState(false);
  const location = Localizacao();
  const mapRef = useRef<MapView>(null);
  const params = useLocalSearchParams();
  const paramLatitude = Number(params.latitude);
  const paramLongitude = Number(params.longitude);
  const paramNome = Array.isArray(params.nome) ? params.nome[0] : params.nome ?? "Local";
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getLocais() {
      try {
        const res = await fetch("http://192.168.0.5:5000/locais");
        const data = await res.json();
        const mapped = data.map((item: any) => ({
          cod: item.code,
          descricao: item.nome ?? "Sem nome",
          resumo: item.descricao ?? "",
          endereco: item.endereco ?? "",
          latitude: Number(item.latitude) ?? 0,
          longitude: Number(item.longitude) ?? 0,
          image: item.urlimage ?? "",
          dias_funcionamento: item.dias ?? "",
          icone: item.urlicone ?? "",
          horario_de_inicio: item.inicio ?? "",
          horario_de_fim: item.fim ?? "",
          classificacaoID: item.tags_names?.[0] ?? "Outro",
        }));
        setLocais(mapped);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
      } finally {
        setLoading(false);
      }
    }
    getLocais();
  }, []);

  useEffect(() => {
    if (mapReady && paramLatitude && paramLongitude) {
      focusOnMarker({
        cod: 0,
        descricao: paramNome,
        resumo: "",
        endereco: "",
        latitude: paramLatitude,
        longitude: paramLongitude,
        image: "",
        dias_funcionamento: "",
        icone: "",
        horario_de_inicio: "",
        horario_de_fim: "",
        classificacaoID: "",
      });
    }
  }, [mapReady, paramLatitude, paramLongitude]);

  if (loading || !location) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05011a]">
        <ActivityIndicator size="large" color="#ea580c" />
      </View>
    );
  }

  const categorias = [
    "Restaurantes",
    "Pontos Culturais",
    "Polos Juninos",
    "Comidas Gigantes",
    "Supermercados",
    "Shoppings",
  ];

  const filteredLocais = searchText
    ? locais.filter((l) => {
        const descricaoNormalizada = l.descricao
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "");
        const searchNormalizada = searchText
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "");
        return descricaoNormalizada.includes(searchNormalizada);
      })
    : locais;

  const categoriasOrdenadas = categorias.sort((a, b) => {
    const aHas = filteredLocais.some((l) => l.classificacaoID === a);
    const bHas = filteredLocais.some((l) => l.classificacaoID === b);
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;
    return 0;
  });

  const filterByCategoria = (categoria: string) =>
    filteredLocais.filter((l) => l.classificacaoID === categoria);

  const getIconForClassificacao = (classificacao: string) => {
    switch (classificacao) {
      case "Restaurantes":
        return require("../assets/comidasicon.png");
      case "Pontos Culturais":
        return require("../assets/culuturalicon.png");
      case "Polos Juninos":
        return require("../assets/polosicon.png");
      case "Comidas Gigantes":
        return require("../assets/comidasgiganteicon.png");
      case "Supermercados":
        return require("../assets/supermercadoicon.png");
      case "Shoppings":
        return require("../assets/shopping.png");
      default:
        return require("../assets/placeholder.png");
    }
  };

  // 🔧 ajuste de zoom: limite para evitar distorções no Android
  const getMarkerSize = () => {
    const minSize = 50;
    const maxSize = 80;
    const zoomFactor = Math.max(0.005, Math.min(zoomLevel, 0.02));
    const normalized = (0.02 - zoomFactor) / 0.015;
    return Math.round(minSize + normalized * (maxSize - minSize));
  };

  const focusOnMarker = (local: LocaisProps) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: local.latitude,
          longitude: local.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  return (
    <View className="flex-1 bg-zinc-900">
      <Header name="TURISMO" searchText={searchText} setSearchText={setSearchText} />
      <MapView
        ref={mapRef}
        onMapReady={() => setMapReady(true)}
        style={{ width: "100%", height: 400 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={(region: Region) => setZoomLevel(region.latitudeDelta)}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Você está aqui"
        />
        {locais.map((local) => (
          <Marker
            key={local.cod}
            coordinate={{
              latitude: local.latitude,
              longitude: local.longitude,
            }}
            title={local.descricao}
            description={local.endereco}
          >
            <Image
              source={getIconForClassificacao(local.classificacaoID)}
              style={{
                width: getMarkerSize(),
                height: getMarkerSize(),
                resizeMode: "contain", // 👈 evita corte
              }}
            />
          </Marker>
        ))}
      </MapView>

      <ScrollView className="flex-1 bg-[#05011a]">
        {categoriasOrdenadas.map((cat) => (
          <View key={cat} className="mb-4">
            <Section
              name={cat}
              action={() => console.log(`Clicou no label ${cat}`)}
              size="text-xl"
            />
            <FlatList
              data={filterByCategoria(cat)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.cod.toString()}
              renderItem={({ item }) => (
                <Card dados={item} onPress={() => focusOnMarker(item)} />
              )}
              ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 8,
                paddingBottom: 90,
              }}
              className="flex-1"
              showsVerticalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
      <LayoutBaixo />
    </View>
  );
}
