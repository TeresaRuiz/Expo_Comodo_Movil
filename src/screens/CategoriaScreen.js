import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from '../estilos/CategoriaScreenStyles'; // Importa los estilos desde un archivo externo
import Button from '../../componets/Button';

const CategoriaScreen = ({ navigation }) => {
  // Función para manejar la acción de cierre de sesión
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Definición de categorías con sus títulos, imágenes y colores de fondo
  const categories = [
    { title: 'Calzado playero', image: require('../img/playa.png'), bgColor: '#FFCC00', screen: 'CalzadoPlayero' },
    { title: 'Calzado casual', image: require('../img/casuales.png'), bgColor: '#FF6699', screen: 'CalzadoCasual' },
    { title: 'Calzado deportivo', image: require('../img/deportivo.png'), bgColor: '#33CCFF', screen: 'CalzadoDeportivo' },
    { title: 'Botines', image: require('../img/botines.png'), bgColor: '#33CCFF', screen: 'Botines' },
    { title: 'Sandalias', image: require('../img/sandalias.png'), bgColor: '#33CCFF', screen: 'Sandalias' },
    { title: 'Calzado para niño', image: require('../img/niños.png'), bgColor: '#33CCFF', screen: 'CalzadoNino' },
  ];

  // Crea valores animados para cada categoría
  const animatedValues = categories.map(() => useRef(new Animated.Value(0)).current);

  // Función para manejar la animación cuando se presiona una categoría
  const handlePressIn = (index) => {
    Animated.timing(animatedValues[index], {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Función para manejar la animación cuando se deja de presionar una categoría
  const handlePressOut = (index) => {
    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Función para determinar el color de fondo animado de una categoría
  const cardBackgroundColor = (index, bgColor) => {
    return animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', bgColor], // de blanco al color de fondo dado
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <Button
            key={index}
            title={category.title}
            onPress={() => navigation.navigate(category.screen)}
            style={[styles.card, { backgroundColor: cardBackgroundColor(index, category.bgColor) }]}
            textStyle={styles.cardTitle}
            icon={<Image source={category.image} style={styles.image} />}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
          />
        ))}
      </View>

      
    </ScrollView>
  );
};

export default CategoriaScreen;
