import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PasswordRecoveryScreen from './src/screens/RecuperacionScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CategoriaScreen from './src/screens/CategoriaScreen'; // Importa la pantalla de categorías

// Crear los navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Definir el Tab Navigator para el Dashboard
const DashboardTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="DashboardMain"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Aquí puedes añadir más pantallas del Dashboard si es necesario */}
    </Tab.Navigator>
  );
};

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
            <Stack.Screen name="DashboardTabs" component={DashboardTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
