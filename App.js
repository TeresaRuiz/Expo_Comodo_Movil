// App.js
import 'react-native-gesture-handler'; // Importa el manejador de gestos para la navegación
import React, { useEffect, useState } from 'react'; // Importa React y hooks
import MainStackNavigator from './src/navegation/StackNavigator'; // Importa el componente del navegador principal
import SplashScreen from './src/screens/SplashScreen'; // Importa la pantalla de carga
import { enableScreens } from 'react-native-screens'; // Importa la función para optimizar la navegación
enableScreens(); // Habilita la optimización de pantallas

// Componente principal de la aplicación
export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true); // Estado para controlar la visualización de la pantalla de carga

  useEffect(() => {
    // Efecto que se ejecuta una vez al montar el componente
    setTimeout(() => {
      setIsShowSplash(false); // Después de 3 segundos, oculta la pantalla de carga
    }, 3000);
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Retorna la pantalla de carga o el navegador principal según el estado
  return isShowSplash ? <SplashScreen /> : <MainStackNavigator />;
}
