import '../styles/global.css';
import { Slot, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-Thin': require('../../assets/fonts/Montserrat-Thin.ttf'),
  });

  if (!fontsLoaded) return null; // espera carregar as fontes

  return <Slot />; 
}
