import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../estilos/ProductoScreenStyles'; 
import Cards1 from '../componets/Cards/Cards3'; 
import * as Constantes from '../utils/constantes';

const ProductoScreen = () => {
  // Hooks de navegación y ruta
  const navigation = useNavigation();
  const route = useRoute();
  const { idCategoria } = route.params;
  // Estados
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
// Obtener la IP de las constantes
  const ip = Constantes.IP;
// Función para obtener los productos de la API
  const fetchProducts = async () => {
    try {
      const formData = new FormData();
      formData.append('idCategoria', idCategoria);
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/producto.php?action=readProductosCategoria`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setProducts(data.dataset);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los productos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
// Efecto para cargar los productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);
// Función para manejar la actualización al hacer pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };
// Filtrar productos basados en el texto de búsqueda
  const filteredProducts = products.filter(product =>
    product.nombre_producto.toLowerCase().includes(searchText.toLowerCase())
  );
// Función para navegar a los detalles del producto
  const handleVerMas = (product) => {
    navigation.navigate('DetallesProducto', { idProducto: product.id_producto });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
       {/* Encabezado con botón de retroceso y barra de búsqueda */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
          <TextInput
            placeholder="Busca tus productos..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
{/* Renderizado condicional: mostrar indicador de carga o lista de productos */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.grid}>
          {filteredProducts.map((product, index) => (
            <Cards1
              key={index}
              item={{
                title: product.nombre_producto,
                description: product.nombre_genero,
                image: `${ip}/Expo_Comodo/api/images/productos/${product.imagen}`,
              }}
              onPress={() => handleVerMas(product)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ProductoScreen;
