import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

// Importación de las pantallas que se usarán en la navegación por pestañas
import DashboardScreen from '../screens/DashboardScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import MiPerfilScreen from '../screens/MiPerfilScreen';
import CarritoScreen from '../screens/CarritoScreen';
import OfertasScreen from '../screens/OfertasScreen'; // Importa OfertasScreen

const Tab = createBottomTabNavigator();

const DashboardTabNavigator = () => {
  const isFocused = useIsFocused();

  const handleScreenFocus = useCallback(() => {
    // Aquí puedes poner la lógica para actualizar los datos
    // Ejemplo:
    // if (isFocused) {
    //   fetchData();
    // }
  }, [isFocused]);

  return (
    // Navegador de pestañas
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        listeners={({ navigation }) => ({
          focus: () => handleScreenFocus(navigation),// Llama a la función al enfocar la pantalla
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> // Ícono de inicio
          ),
          tabBarLabel: () => null,
        }}
      />
       
      <Tab.Screen
        name="Categorias"
        component={CategoriaScreen}
        listeners={({ navigation }) => ({
          focus: () => handleScreenFocus(navigation),
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} /> // Ícono de cuadrícula
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Ofertas" // Agrega el nombre para la pantalla de Ofertas
        component={OfertasScreen} // Asegúrate de que OfertasScreen esté importado
        listeners={({ navigation }) => ({
          focus: () => handleScreenFocus(navigation),
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetags" size={size} color={color} /> // Cambia el ícono si es necesario
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CarritoScreen}
        listeners={({ navigation }) => ({
          focus: () => handleScreenFocus(navigation),
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} /> // Ícono de carrito
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={PerfilScreen}
        listeners={({ navigation }) => ({
          focus: () => handleScreenFocus(navigation),
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
    
  );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default DashboardTabNavigator;
