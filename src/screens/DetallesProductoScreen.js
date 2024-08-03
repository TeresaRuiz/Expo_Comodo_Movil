import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../estilos/DetallesProductosScreen';
import * as Constantes from '../utils/constantes';

const DetallesProductoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idProducto } = route.params;
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const ip = Constantes.IP;

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
      setRefreshing(false);
    }
  };

  const refreshScreen = () => {
    setRefreshing(true);
    fetchProducto();
  };

  useEffect(() => {
    fetchProducto();
  }, []);

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
        setMostrarAlerta(true);
        setTimeout(() => {
          setMostrarAlerta(false);
        }, 2000);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al agregar el producto al carrito');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron detalles del producto</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mostrarAlerta && (
        <View style={styles.alerta}>
          <Text style={styles.alertaTexto}>Producto añadido al carrito</Text>
        </View>
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${producto.imagen}` }} style={styles.image} />
      <Text style={styles.title}>{producto.nombre_producto}</Text>
      <Text style={styles.description}>{producto.descripcion_detalle}</Text>
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
      <TouchableOpacity style={styles.addButton} onPress={agregarAlCarrito}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetallesProductoScreen;
