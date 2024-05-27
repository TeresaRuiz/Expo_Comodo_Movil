import 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import SecondScreen from './src/screens/SecondScreen';
import { useEffect, useState } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';



export default function App() {
  const Tab = createBottomTabNavigator();

  const [isShowSplash, setIsShowSplash] = useState(true);
  
  useEffect(() =>{
    setTimeout(() =>{
      setIsShowSplash(false);
    }, 3000);
    
  });
  
  return (
    <>
    {isShowSplash ? (
      <SplashScreen/>
    ): (
      <NavigationContainer>
      <Tab.Navigator  screenOptions={{
          headerShown: false
        }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}/>
        <Tab.Screen name="Comidas" component={SecondScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
    )}
    </>

  );

}


