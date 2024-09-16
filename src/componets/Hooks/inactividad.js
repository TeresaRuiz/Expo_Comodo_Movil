import { useState, useEffect, useRef } from 'react';
import { AppState, Alert, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Constantes from '../../utils/constantes.js';

export const useInactividadSesion = (inactivityTimeout = 300000) => { // 5 minutos por defecto
  const navigation = useNavigation();
  const ip = Constantes.IP;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const inactivityTimer = useRef(null);
  const appStateLogoutTimer = useRef(null);  // Temporizador para la salida de sesión por cambio de estado

  const handleLogout = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logOut`;
      console.log('URL solicitada:', url);

      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();

      if (data.status) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login', params: { clearLoginData: true } }],
        });
        Alert.alert('Sesión cerrada', 'Su sesión ha sido cerrada exitosamente.');
      } else {
        console.error('Error al cerrar sesión:', data.error);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const checkSession = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=checkSession`;
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();

      if (!data.status) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(handleLogout, inactivityTimeout);
  };

  const resetAppStateLogoutTimer = () => {
    if (appStateLogoutTimer.current) {
      clearTimeout(appStateLogoutTimer.current);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: resetInactivityTimer,
      onPanResponderMove: resetInactivityTimer,
    })
  ).current;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
        // Si la aplicación va a inactiva o segundo plano, inicia un temporizador de 1 minuto
        appStateLogoutTimer.current = setTimeout(handleLogout, 60000); // 1 minuto
      } else if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // Si la aplicación vuelve a activa, cancela el temporizador de cierre de sesión
        resetAppStateLogoutTimer();
        checkSession();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    resetInactivityTimer();

    return () => {
      subscription.remove();
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      resetAppStateLogoutTimer();
    };
  }, []);

  return { 
    handleLogout, 
    checkSession,
    panHandlers: panResponder.panHandlers,
  };
};
