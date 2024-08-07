// Importación de módulos y componentes necesarios
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../estilos/DetallesProductosScreen';
import * as Constantes from '../utils/constantes';
// Definición del componente principal
const DetallesProductoScreen = () => {
  // Hooks de navegación y ruta
  const navigation = useNavigation();
  const route = useRoute();
  const { idProducto } = route.params;
  // Estados del componente
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidadProducto, setCantidadProducto] = useState('');
// Obtención de la dirección IP desde las constantes
  const ip = Constantes.IP;
// Función para obtener los detalles del producto
  const fetchProducto = async () => {
    try {
      const formData = new FormData();
      formData.append('idProducto', idProducto);
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/producto.php?action=readOne`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setProducto(data.dataset);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los detalles del producto');
    } finally {
      setLoading(false);
    }
  };
// Efecto para cargar los detalles del producto al montar el componente
  useEffect(() => {
    fetchProducto();
  }, []);
 // Función para agregar el producto al carrito
  const agregarAlCarrito = async () => {
    const cantidadNumerica = parseInt(cantidadProducto, 10);
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      Alert.alert('Error', 'Por favor, ingresa una cantidad válida');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('idProducto', idProducto);
      formData.append('cantidadProducto', cantidadProducto);

      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=createDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        // Actualiza el carrito en AsyncStorage
        const carritoData = await AsyncStorage.getItem('@carrito');
        let carrito = carritoData ? JSON.parse(carritoData) : [];
        carrito.push({ idProducto, cantidad: cantidadNumerica });
        await AsyncStorage.setItem('@carrito', JSON.stringify(carrito));

        Alert.alert('Éxito', 'Producto añadido al carrito', [
          { text: 'OK', onPress: () => navigation.navigate('Carrito')},
        ]);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al agregar el producto al carrito');
    }
  };
// Renderizado condicional para mostrar el indicador de carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
// Renderizado condicional si no se encuentra el producto
  if (!producto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron detalles del producto</Text>
      </View>
    );
  }
// Renderizado principal del componente
  return (
    <ScrollView contentContainerStyle={styles.container}>
       {/* Botón para regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      {/* Imagen del producto */}
      <Image source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${producto.imagen}` }} style={styles.image} />
       {/* Título y descripción del producto */}
      <Text style={styles.title}>{producto.nombre_producto}</Text>
      <Text style={styles.description}>{producto.descripcion_detalle}</Text>
       {/* Detalles del producto */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Marca:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_marca}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Código del zapato:</Text>
          <Text style={styles.detailsValue}>{producto.codigo_interno}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Género del zapato:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_genero}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Material:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_material}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Talla:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_talla}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Color:</Text>
          <Text style={styles.detailsValue}>{producto.color}</Text>
        </View>
      </View>
      {/* Información de precios y existencias */}
      <View style={styles.pricingInfoContainer}>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Precio unitario (US$):</Text>
          <Text style={styles.pricingInfoValue}>{producto.precio}</Text>
        </View>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Existencias:</Text>
          <Text style={styles.pricingInfoValue}>{producto.existencias}</Text>
        </View>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Descuento %:</Text>
          <Text style={styles.pricingInfoValue}>{producto.porcentaje_descuento}</Text>
        </View>
          {/* Input para la cantidad de producto */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="numeric"
            onChangeText={setCantidadProducto}
            value={cantidadProducto.toString()}
          />
        </View>
      </View>
      {/* Botón para añadir al carrito */}
      <TouchableOpacity style={styles.addButton} onPress={agregarAlCarrito}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
// Exportación del componente
export default DetallesProductoScreen;
