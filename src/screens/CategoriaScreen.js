import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Image, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilos/CategoriaScreenStyles'; // Importa los estilos desde un archivo externo
import Button from '../../componets/Button';
import * as Constantes from '../../utils/constantes';

const CategoriaCard = ({ category, index, ip, navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const cardBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#33CCFF'],
  });

  const handleVerMas = () => {
    navigation.navigate('Producto', { idCategoria: category.id_categoria });
  };

  return (
    <Button
      key={index}
      title={category.nombre_categoria}
      onPress={handleVerMas}
      style={[styles.card, { backgroundColor: cardBackgroundColor }]}
      textStyle={styles.cardTitle}
      icon={<Image source={{ uri: `${ip}/Expo_Comodo/api/images/categorias/${category.imagen}` }} style={styles.image} />}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    />
  );
};

const CategoriaScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const ip = Constantes.IP;

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/categoria.php?action=readAll`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setCategories(data.dataset);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCategories();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Categorías</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <CategoriaCard
            key={index}
            category={category}
            index={index}
            ip={ip}
            navigation={navigation}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Ionicons name="lock-closed" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CategoriaScreen;