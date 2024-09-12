import { useState, useEffect, useRef } from 'react';
import { AppState, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import * as Constantes from '../../utils/constantes.js';

export const useInactividadSesion = () => {
  const navigation = useNavigation(); // Usa useNavigation para obtener el objeto navigation
  const ip = Constantes.IP;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const inactivityTimer = useRef(null);

  const handleLogout = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logOut`;
      console.log('URL solicitada:', url);

      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();

      if (data.status) {
        if (navigation && navigation.navigate) {
          navigation.navigate('Login', { clearLoginData: true });
          Alert.alert('Sesión cerrada', 'Su sesión ha sido cerrada.');
        }
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  const checkSession = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=checkSession`;
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();

      if (!data.status) {
        if (navigation && navigation.navigate) {
          navigation.navigate('Login', { clearLoginData: true });
          Alert.alert('Sesión expirada', 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        }
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // App ha vuelto al primer plano
        checkSession();
      } else if (nextAppState.match(/inactive|background/)) {
        // App ha ido al segundo plano o está inactiva
        handleLogout();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    const sessionCheckInterval = setInterval(checkSession, 60000);

    return () => {
      clearInterval(sessionCheckInterval);
      clearTimeout(inactivityTimer.current);
      subscription.remove();
    };
  }, []);

  return { handleLogout, checkSession };
};
