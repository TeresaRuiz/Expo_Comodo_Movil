import { useState, useEffect, useRef } from 'react'; // Importa hooks de React
import { AppState, Alert, PanResponder } from 'react-native'; // Importa componentes de React Native
import { useNavigation } from '@react-navigation/native'; // Hook para navegación
import * as Constantes from '../../utils/constantes.js'; // Importa constantes

// Hook para manejar la inactividad de sesión
export const useInactividadSesion = (inactivityTimeout = 300000) => { // Tiempo de inactividad por defecto: 5 minutos
  const navigation = useNavigation(); // Hook para acceder a la navegación
  const ip = Constantes.IP; // Obtiene la dirección IP de las constantes
  const appState = useRef(AppState.currentState); // Referencia al estado actual de la app
  const [appStateVisible, setAppStateVisible] = useState(appState.current); // Estado del appState
  const inactivityTimer = useRef(null); // Referencia al temporizador de inactividad

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logOut`; // URL para cerrar sesión
      console.log('URL solicitada:', url);

      const response = await fetch(url, { method: 'GET' }); // Realiza la solicitud
      const data = await response.json(); // Convierte la respuesta a JSON

      if (data.status) { // Verifica si la respuesta es exitosa
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login', params: { clearLoginData: true } }], // Redirige a la pantalla de Login
        });
        Alert.alert('Sesión cerrada', 'Su sesión ha sido cerrada exitosamente.'); // Muestra alerta de cierre
      } else {
        console.error('Error al cerrar sesión:', data.error); // Maneja error en cierre de sesión
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error); // Maneja error en la solicitud
    }
  };

  // Función para verificar si la sesión sigue activa
  const checkSession = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=checkSession`; // URL para verificar sesión
      const response = await fetch(url, { method: 'GET' }); // Realiza la solicitud
      const data = await response.json(); // Convierte la respuesta a JSON

      if (!data.status) { // Si la sesión no es válida
        handleLogout(); // Cierra sesión
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error); // Maneja error en la verificación
    }
  };

  // Reinicia el temporizador de inactividad
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current); // Limpia el temporizador anterior
    }
    inactivityTimer.current = setTimeout(handleLogout, inactivityTimeout); // Establece un nuevo temporizador
  };

  // Configuración del PanResponder para detectar la interacción del usuario
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Permite que el responder se active al inicio del toque
      onMoveShouldSetPanResponder: () => true, // Permite que el responder se active al mover
      onStartShouldSetPanResponderCapture: () => true, // Captura el inicio del toque
      onMoveShouldSetPanResponderCapture: () => true, // Captura el movimiento del toque
      onPanResponderGrant: resetInactivityTimer, // Reinicia temporizador al tocar
      onPanResponderMove: resetInactivityTimer, // Reinicia temporizador al mover
    })
  ).current;

  useEffect(() => {
    // Suscripción a cambios en el estado de la aplicación
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
        handleLogout(); // Cierra sesión si la app pasa a segundo plano
      } else if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        checkSession(); // Verifica sesión si la app vuelve a estar activa
      }

      appState.current = nextAppState; // Actualiza el estado actual
      setAppStateVisible(appState.current); // Actualiza el estado visible
    });

    resetInactivityTimer(); // Inicia el temporizador de inactividad

    return () => {
      subscription.remove(); // Limpia la suscripción al desmontar
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current); // Limpia el temporizador al desmontar
      }
    };
  }, []);

  return { 
    handleLogout, // Exporta la función de cerrar sesión
    checkSession, // Exporta la función de verificar sesión
    panHandlers: panResponder.panHandlers, // Exporta los manejadores de pan
  };
};
