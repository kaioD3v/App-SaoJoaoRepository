import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "./card/Turismo2";

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
  classificacaoID: string; // ✅ agora string
}

interface PropsLocais {
  tipo: "Turismo" | "Pontos Culturais" | "Restaurantes" | "Polos Juninos" | "Comidas Gigantes" | "Supermercados" | "Shoppings";
}

export function ListaLocais({ tipo }: PropsLocais) {
  const [locais, setLocais] = useState<LocaisProps[]>([]);

  useEffect(() => {
    async function getLocais() {
      try {
        const response = await fetch(`http://192.168.0.5:5000/locais`);
        const data: LocaisProps[] = await response.json();

        const filtrados = tipo === "Turismo" ? data : data.filter(local => local.classificacaoID === tipo);

        setLocais(filtrados);
      } catch (error) {
        console.error(`Erro ao buscar locais ${tipo}:`, error);
      }
    }

    getLocais();
  }, [tipo]);

  return (
    <FlatList
      data={locais}
      keyExtractor={(item) => item.cod.toString()}
      renderItem={({ item }) => <Card dados={item} />}
      horizontal
      className="px-4"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 14 }}
    />
  );
}