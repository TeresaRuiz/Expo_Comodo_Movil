// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import MainStackNavigator from './src/navegation/StackNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  return isShowSplash ? <SplashScreen /> : <MainStackNavigator />;
}
