import React, { useEffect, useRef } from 'react'; // Importa React y hooks
import { View, Animated, StyleSheet, Easing, Image } from 'react-native'; // Asegúrate de importar Image de react-native
import Icon from '../img/calentamiento.png'; // Ruta de la imagen de splash screen
import styles from '../estilos/SplashScreenStyles'; // Importa los estilos desde un archivo externo


export default function SplashScreen() {
   // Crea una referencia para el valor de escala de la animación
  const scaleValue = useRef(new Animated.Value(1)).current;

    // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Configura y comienza la animación
    Animated.timing(scaleValue, {
      toValue: 2, // Escala de zoom del 100% al 200%
      duration: 1000, // Duración de la animación en milisegundos
      easing: Easing.linear, // Utiliza el driver nativo para mejor rendimiento  
      useNativeDriver: true,  // Inicia la animación
    }).start(); // Inicia la animación
  }, [scaleValue]); // Dependencia de scaleValue

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: scaleValue }] }]}>
        <Image source={Icon} style={styles.image} />
      </Animated.View>
    </View>
  );
}


