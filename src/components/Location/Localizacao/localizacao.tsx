import { useEffect, useState } from 'react';
import { LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';


export function Localizacao() {
  const [location, setlocation] = useState<LocationObject | null>(null);

    async function PedirPermissão(){

      const { granted } = await requestForegroundPermissionsAsync();

      if(granted){
        const Posicao = await getCurrentPositionAsync();

        setlocation(Posicao);
        console.log(Posicao)
      }
    }
    useEffect(() => {
      PedirPermissão();

    }, [])

      useEffect(() => {
        watchPositionAsync({
          accuracy: LocationAccuracy.Highest,
          timeInterval:100,
          distanceInterval: 1
        }, (response)=>{
          console.log('Nova loc =>', response)
          setlocation(response)
        });
      }, [])
      return location;
}