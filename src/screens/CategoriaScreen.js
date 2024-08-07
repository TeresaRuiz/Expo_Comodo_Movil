import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated, Image, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilos/CategoriaScreenStyles'; // Importa los estilos desde un archivo externo
import Cards1 from '../componets/Cards/Cards1'; // Importa el componente Cards1
import * as Constantes from '../utils/constantes';

const CategoriaScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [refreshing, setRefreshing] = useState(false);// Estado para manejar el indicador de refresco

  const ip = Constantes.IP; // Obtiene la IP desde las constantes
// Función para obtener las categorías desde el servidor
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/categoria.php?action=readAllCategorias`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setCategories(data.dataset); // Actualiza el estado con las categorías obtenidas
      } else {
        Alert.alert('Error', data.message); // Muestra un mensaje de error si no se obtienen las categorías
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las categorías'); // Muestra un mensaje de error si ocurre una excepción
    } finally {
      setLoading(false); // Oculta el indicador de carga
      setRefreshing(false); // Oculta el indicador de refresh
    }
  };
// Efecto para obtener las categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);
// Función para manejar el refresh manual de las categorías
  const handleRefresh = () => {
    setRefreshing(true);
    fetchCategories();
  };
 // Renderizado condicional para mostrar el indicador de carga
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
