// components/botao.tsx
import { View, Pressable, Text, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { FloatingCard } from "../../Cards/CardFlutuante";
import { useRouter } from "expo-router"; // <<< IMPORTANTE

interface Polo {
  id: string;
  titulo: string;
  descricao: string;
  thumb: string; // imagem menor (botão)
  cardImage: any; // imagem grande (require local ou url)
  local: string;
  data: string;
  latitude: number;
  longitude: number;
}

export default function Button() {
  const [polos, setPolos] = useState<Polo[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // <<< expo-router

  useEffect(() => {
    const fetchPolos = async () => {
      try {
        const res = await fetch("http://192.168.0.5:5000/polo");
        const data = await res.json();

        // embaralha e pega 4
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        const polosData: Polo[] = selected.map((p: any, index: number) => ({
          id: p.code,
          titulo: p.nome,
          descricao: p.descricao,
          thumb: p.urlimagem,
          cardImage: { uri: p.urlimagem },
          local: p.endereco,
          data: p.inicio ? `${p.inicio} até ${p.fim}` : "",
          latitude: Number(p.latitude) || 0,
          longitude: Number(p.longitude) || 0,
        }));

        setPolos(polosData);
      } catch (err) {
        console.error("Erro ao buscar polos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolos();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ea580c" />
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap justify-between px-4">
      {polos.map((polo) => (
        <Pressable
          key={polo.id}
          onPress={() => setOpenId(polo.id)}
          className="w-[48%] flex-row items-center p-0 bg-white/10 rounded-xl mb-4 h-20 overflow-hidden"
        >
          <Image
            source={{ uri: polo.thumb }}
            className="w-1/3 h-full"
            resizeMode="cover"
          />
          <Text className="ml-4 text-white font-montserrat-bold flex-1 text-center">
            {polo.titulo}
          </Text>
        </Pressable>
      ))}

      {polos.map((polo) => (
        <FloatingCard
          key={polo.id}
          visible={openId === polo.id}
          onClose={() => setOpenId(null)}
        >
          <Image
            source={polo.cardImage}
            className="w-full h-40 rounded-xl mb-3"
            resizeMode="cover"
          />
          <Text className="text-white font-montserrat-bold text-xl mb-2">{polo.titulo}</Text>
          <Text className="text-gray-400 font-montserrat mb-3">{polo.descricao}</Text>

          <View className="mt-3 flex-row items-center justify-between w-full">
            {/* Botão Ver Localização */}
            <Pressable
              className="bg-orange-500 px-3 py-2 rounded-lg"
              onPress={() => {
                router.push({
                  pathname: "/mapa",
                  params: {
                    latitude: polo.latitude,
                    longitude: polo.longitude,
                    nome: polo.titulo,
                  },
                });
                setOpenId(null);
              }}
            >
              <Text className="text-white font-montserrat-bold">Ver Localização</Text>
            </Pressable>

            {/* Botão Ver Cronograma */}
            <Pressable
              className="bg-blue-600 px-3 py-2 rounded-lg ml-2"
              onPress={() => {
                router.push({
                  pathname: "/cronograma",
                  params: { polo: polo.id },
                });
                setOpenId(null);
              }}
            >
              <Text className="text-white font-montserrat-bold">Ver Cronograma</Text>
            </Pressable>
          </View>
        </FloatingCard>
      ))}
    </View>
  );
}
