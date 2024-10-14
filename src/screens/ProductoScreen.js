import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../estilos/ProductoScreenStyles';
import Cards1 from '../componets/Cards/Cards3';
import * as Constantes from '../utils/constantes';

const ProductoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idCategoria } = route.params;
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
 
  const ip = Constantes.IP;

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
        // Agrupar productos por id_producto
        const groupedProducts = data.dataset.reduce((acc, product) => {
          if (!acc[product.id_producto]) {
            acc[product.id_producto] = {
              ...product,
              detalles: [{
                id_detalle: product.id_detalle_producto,
                color: product.color,
                talla: product.nombre_talla
              }]
            };
          } else {
            acc[product.id_producto].detalles.push({
              id_detalle: product.id_detalle_producto,
              color: product.color,
              talla: product.nombre_talla
            });
          }
          return acc;
        }, {});
        setProducts(Object.values(groupedProducts));
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.nombre_producto.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleVerMas = (product) => {
    navigation.navigate('DetallesProducto', { 
      idProducto: product.id_producto, 
      detalles: product.detalles 
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.grid}>
  {filteredProducts.map((product) => (
    <Cards1
      key={product.id_producto}
      item={{
        title: product.nombre_producto,
        description: `${product.detalles.length} Estilos disponibles - Género: ${product.nombre_genero}`,
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