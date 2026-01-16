import { useState, useEffect } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import { Header } from "../components/Headers/globalHeader";

interface MembroEquipe {
  id: number;
  nome: string;
  funcao: string;
  foto: string;
  email: string;
}

export default function Equipe() {
  const [equipe, setEquipe] = useState<MembroEquipe[]>([]);
  const [loading, setLoading] = useState(true);

  // 🧩 Mapa de imagens locais (adicione as que tiver em /assets)
  const imageMap: Record<string, any> = {
    "local:KAIO.jpg": require("../assets/KAIO.jpg"),
    "local:JOAO.jpg": require("../assets/JOAO.jpg"),
    "local:KAUA.jpg": require("../assets/KAUA.jpg"),
    "local:INGRIDY.jpg": require("../assets/INGRIDY.jpg"),
    "local:ITALO.jpg": require("../assets/ITALO.jpg"),
    "local:EDUARDO.jpg": require("../assets/EDUARDO.jpg"),
    "local:TAROBA.jpg": require("../assets/TAROBA.jpg"),
  };

  useEffect(() => {
    async function fetchEquipe() {
      try {
        const res = await fetch("http://192.168.0.5:5000/equipe");
        const data = await res.json();

        const mapped = data.map((item: any) => ({
          id: item.code ?? 0,
          nome: item.nome ?? "Sem nome",
          funcao: item.funcao ?? "Função não informada",
          foto: item.urlimagem ?? "",
          email: item.email ?? "Sem e-mail",
        }));

        // ordena por nome
        mapped.sort((a: MembroEquipe, b: MembroEquipe) =>
          a.nome.localeCompare(b.nome)
        );
        setEquipe(mapped);
      } catch (err) {
        console.error("Erro ao buscar equipe:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEquipe();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05011a]">
        <ActivityIndicator size="large" color="#ea580c" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: MembroEquipe }) => (
    <View className="flex-row bg-[#1a1a2e] rounded-2xl p-4 mb-5 shadow-lg shadow-black/50">
      {/* FOTO (1/3) */}
      <View className="w-1/3 justify-center items-center">
        <Image
          source={
            imageMap[item.foto] // 👈 tenta achar imagem local
              ? imageMap[item.foto]
              : { uri: item.foto } // 👈 fallback para URL externa
          }
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>

      {/* INFORMAÇÕES (2/3) */}
      <View className="w-2/3 justify-center pl-3">
        <Text className="text-white text-lg font-montserrat-bold mb-1">
          {item.nome}
        </Text>
        <Text className="text-gray-400 text-base font-montserrat mb-1">
          {item.funcao}
        </Text>
        <Text className="text-gray-500 text-sm font-montserrat">
          {item.email}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#05011a]">
      <Header name="Equipe" />

      <FlatList
        data={equipe}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
