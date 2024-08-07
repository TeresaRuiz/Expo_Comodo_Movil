import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated, Image, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilos/CategoriaScreenStyles'; // Importa los estilos desde un archivo externo
import Cards1 from '../componets/Cards/Cards1'; // Importa el componente Cards1
import * as Constantes from '../utils/constantes';

const CategoriaScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const ip = Constantes.IP;

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/categoria.php?action=readAllCategorias`, {
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
          <Cards1
            key={index}
            item={{
              title: category.nombre_categoria,
              image: `${ip}/Expo_Comodo/api/images/productos/${category.imagen}`
            }}
            onPress={() => navigation.navigate('Producto', { idCategoria: category.id_categoria })}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoriaScreen;
