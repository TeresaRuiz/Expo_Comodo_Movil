import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../estilos/DetallesProductosScreen';
import * as Constantes from '../utils/constantes';
import { getColorValue, getFontColorForBackground } from '../utils/colorUtils';

const DetallesProductoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idProducto, detalles } = route.params;
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [selectedDetail, setSelectedDetail] = useState(null);

  const ip = Constantes.IP;

  // Agrupar detalles por color
  const colorGroups = detalles.reduce((acc, detalle) => {
    if (!acc[detalle.color]) {
      acc[detalle.color] = [];
    }
    acc[detalle.color].push(detalle);
    return acc;
  }, {});

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

  useEffect(() => {
    fetchProducto();
  }, []);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedDetail(null);
  };

  const handleTallaSelect = (detalle) => {
    setSelectedDetail(detalle);
  };

  const agregarAlCarrito = async () => {
    if (!selectedDetail) {
      Alert.alert('Error', 'Por favor, selecciona un color y talla');
      return;
    }

    const cantidadNumerica = parseInt(cantidadProducto, 10);
    
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0 || cantidadNumerica > 5) {
      Alert.alert('Error', 'Por favor, ingresa una cantidad válida (máximo 5)');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('idProducto', selectedDetail.id_detalle);
      formData.append('cantidadProducto', cantidadNumerica);

      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=createDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        const carritoData = await AsyncStorage.getItem('@carrito');
        let carrito = carritoData ? JSON.parse(carritoData) : [];
        carrito.push({ 
          idProducto: selectedDetail.id_detalle, 
          cantidad: cantidadNumerica 
        });
        await AsyncStorage.setItem('@carrito', JSON.stringify(carrito));

        Alert.alert('Éxito', 'Producto añadido al carrito', [
          { text: 'OK', onPress: () => navigation.navigate('Carrito') },
        ]);
      } else {
        Alert.alert('Error', data.error || 'La cantidad ingresada sobrepasa la disponibilidad del producto');
      }
    } catch (error) {
      console.error(error);
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <Image 
        source={{ 
          uri: selectedDetail 
            ? `${ip}/Expo_Comodo/api/images/productos/${selectedDetail.imagen || producto.imagen}`
            : `${ip}/Expo_Comodo/api/images/productos/${producto.imagen}` 
        }} 
        style={styles.image} 
      />
      
      <Text style={styles.title}>{producto.nombre_producto}</Text>
      <Text style={styles.description}>{producto.descripcion_detalle}</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Colores disponibles:</Text>
        <View style={styles.colorContainer}>
  {Object.keys(colorGroups).map((colorName) => {
    const backgroundColor = getColorValue(colorName);
    
    return (
      <TouchableOpacity
        key={colorName}
        onPress={() => handleColorSelect(colorName)}
        style={[
          styles.colorCircle,
          { backgroundColor },
          selectedColor === colorName && styles.selectedColorCircle
        ]}
      >
        {/* Elimina el componente de texto para que solo quede el círculo */}
      </TouchableOpacity>
    );
  })}
</View>

        {selectedColor && (
          <>
            <Text style={styles.sectionTitle}>Tallas disponibles:</Text>
            <View style={styles.tallasContainer}>
              {colorGroups[selectedColor].map((detalle) => (
                <TouchableOpacity
                  key={detalle.id_detalle}
                  style={[
                    styles.tallaButton,
                    selectedDetail?.id_detalle === detalle.id_detalle && styles.selectedTallaButton
                  ]}
                  onPress={() => handleTallaSelect(detalle)}
                >
                  <Text style={[
                    styles.tallaText,
                    selectedDetail?.id_detalle === detalle.id_detalle && styles.selectedTallaText
                  ]}>
                    {detalle.talla}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Marca:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_marca}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Código:</Text>
          <Text style={styles.detailsValue}>{producto.codigo_interno}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Género:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_genero}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Material:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_material}</Text>
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
            placeholder="Máximo 5"
            keyboardType="numeric"
            onChangeText={setCantidadProducto}
            value={cantidadProducto.toString()}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.addButton, !selectedDetail && styles.disabledButton]} 
        onPress={agregarAlCarrito}
        disabled={!selectedDetail}
      >
        <Text style={styles.addButtonText}>
          {selectedDetail ? 'Agregar al carrito' : 'Selecciona color y talla'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetallesProductoScreen;