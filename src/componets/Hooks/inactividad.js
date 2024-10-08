import { useState, useEffect, useRef } from 'react';
import { AppState, Alert, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Constantes from '../../utils/constantes.js';

export const useInactividadSesion = () => {
  const navigation = useNavigation();
  const ip = Constantes.IP;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const inactivityTimer = useRef(null);
  const backgroundTimer = useRef(null);

  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutos
  const BACKGROUND_TIMEOUT = 60 * 1000; // 1 minuto

  const handleLogout = async (isInactivity = false) => {
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
        
        if (isInactivity) {
          Alert.alert('Sesión cerrada', 'Su sesión ha sido cerrada por inactividad.');
        } else {
          Alert.alert('Sesión cerrada', 'Su sesión ha sido cerrada exitosamente.');
        }
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
        handleLogout(true);
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => handleLogout(true), INACTIVITY_TIMEOUT);
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
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // La app vuelve a estar activa
        checkSession();
        if (backgroundTimer.current) {
          clearTimeout(backgroundTimer.current);
        }
      } else if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
        // La app pasa a segundo plano
        if (backgroundTimer.current) {
          clearTimeout(backgroundTimer.current);
        }
        backgroundTimer.current = setTimeout(() => handleLogout(true), BACKGROUND_TIMEOUT);
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
      if (backgroundTimer.current) {
        clearTimeout(backgroundTimer.current);
      }
    };
  }, []);

  return { 
    handleLogout: () => handleLogout(false), // Cierre de sesión voluntario
    checkSession,
    panHandlers: panResponder.panHandlers,
  };
};