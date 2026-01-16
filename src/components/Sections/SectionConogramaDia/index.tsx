import { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

type Exibicao = {
  code: number;
  dia: string; // formato ISO: "2025-05-31"
};

type SectionDataProps = {
  onDateChange: (isoDate: string) => void;
  date: string;
  exibicoes: Exibicao[];
};

export function SectionData({ onDateChange, date: parentDate, exibicoes }: SectionDataProps) {
  const parseDate = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    return { year, month, day };
  };

  const months = [
    { name: "Abril", number: 4, days: 30 },
    { name: "Maio", number: 5, days: 31 },
    { name: "Junho", number: 6, days: 30 },
  ];

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  const [date, setDate] = useState(parseDate(parentDate));
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  // Atualiza quando a data pai muda
  useEffect(() => setDate(parseDate(parentDate)), [parentDate]);

  // Envia ao pai sempre que mudar localmente
  useEffect(() => {
    const iso = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
    onDateChange(iso);
  }, [date]);

  // Inicialização
  useEffect(() => {
    const today = new Date();
    let targetDate = today;

    // se mês fora de Abril, Maio, Junho, ajusta para dia mais próximo
    if (![4, 5, 6].includes(today.getMonth() + 1)) {
      // pegar primeiro mês disponível
      targetDate = new Date(2025, 3, 1); // Abril/2025
    }

    const monthIndex = months.findIndex(m => m.number === targetDate.getMonth() + 1);
    setSelectedMonthIndex(monthIndex >= 0 ? monthIndex : 0);
    setDate(parseDate(targetDate.toISOString().split("T")[0]));
  }, []);

  function previousDay() {
    setDate(prev => {
      const d = new Date(prev.year, prev.month - 1, prev.day - 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    });
  }

  function nextDay() {
    setDate(prev => {
      const d = new Date(prev.year, prev.month - 1, prev.day + 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    });
  }

  const currentMonth = months[selectedMonthIndex];
  const firstDay = new Date(date.year, currentMonth.number - 1, 1).getDay();
  const totalCells = 42;

  const daysArray = Array.from({ length: totalCells }, (_, i) => {
    const dayNumber = i - firstDay + 1;
    return dayNumber > 0 && dayNumber <= currentMonth.days ? dayNumber : null;
  });

  // Dias com exibição
  const exibicaoDaysSet = new Set(
    exibicoes
      .map(e => parseDate(e.dia))
      .filter(d => d.year === date.year && d.month === currentMonth.number)
      .map(d => d.day)
  );

  return (
    <View className="py-6 items-center w-full">
      {/* Navegação de dias */}
      <View className="flex-row items-center justify-center w-full">
        <Pressable onPress={previousDay} className="px-4">
          <Feather name="chevron-left" size={40} color="white" />
        </Pressable>



        <Pressable onPress={() => setShowMiniCalendar(prev => !prev)} className="px-4 py-2 bg-white rounded-3xl flex-row items-center">
          <Feather name="calendar" size={20} color="#05011a" style={{ marginRight: 6 }} />
          <Text className="text-[#05011a] text-2xl font-montserrat-bold">
            {String(date.day).padStart(2, "0")} | {String(date.month).padStart(2, "0")}
          </Text>
        </Pressable>

        <Pressable onPress={nextDay} className="px-4">
          <Feather name="chevron-right" size={40} color="white" />
        </Pressable>
      </View>

      {/* Mini calendário */}
      {showMiniCalendar && (
        <View className="bg-[#05011a] rounded-xl mt-3 p-4 w-72">
          {/* Selector de meses */}
          <View className="flex-row justify-between mb-2">
            {months.map((m, idx) => (
              <Pressable key={m.number} onPress={() => setSelectedMonthIndex(idx)}>
                <Text className={`text-lg font-semibold ${idx === selectedMonthIndex ? "text-white" : "text-gray-400"}`}>
                  {m.name}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Dias da semana */}
          <View className="flex-row">
            {weekDays.map((d, idx) => (
              <View key={idx} style={{ flex: 1, aspectRatio: 1, justifyContent: "center", alignItems: "center" }}>
                <Text className="text-gray-400 font-semibold">{d}</Text>
              </View>
            ))}
          </View>

          {/* Dias do mês */}
          <FlatList
            data={daysArray}
            keyExtractor={(_, idx) => idx.toString()}
            numColumns={7}
            renderItem={({ item }) => {
              if (!item) return <View style={{ flex: 1, aspectRatio: 1, margin: 2, opacity: 0 }} />;

              const isSelected = item === date.day && currentMonth.number === date.month;
              const hasExibicao = exibicaoDaysSet.has(item);

              let bgColor = "#374151";
              if (hasExibicao && isSelected) bgColor = "#ea580c";
              else if (hasExibicao) bgColor = "green";
              else if (isSelected) bgColor = "#3b82f6";

              return (
                <Pressable
                  onPress={() => setDate({ year: date.year, month: currentMonth.number, day: item })}
                  style={{
                    flex: 1,
                    aspectRatio: 1,
                    margin: 2,
                    borderRadius: 6,
                    backgroundColor: bgColor,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-white text-center">{item}</Text>
                </Pressable>
              );
            }}
          />

                                    {/* Mini legenda */}
          <View className="flex-row flex-wrap justify-center mt-3 w-full px-4 gap-4">
            {[
              { color: "#ea580c", label: "Selecionado com Show" },
              { color: "#3b82f6", label: "Dia selecionado" },
              { color: "green", label: "Dia com show" },
            ].map((item, idx) => (
              <View key={idx} className="flex-row items-center">
                <View
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: item.color,
                    borderRadius: 3,
                    marginRight: 6,
                  }}
                />
                <Text className="text-gray-400 text-sm">{item.label}</Text>
              </View>
            ))}
          </View>


        </View>
      )}
    </View>
  );
}
