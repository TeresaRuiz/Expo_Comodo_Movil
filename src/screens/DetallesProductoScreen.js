import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CarritoScreen from './CarritoScreen'; // Importa la pantalla CarritoScreen
import styles from '../estilos/DetallesProductosScreen';

const DetallesProductoScreen = ({ route, navigation }) => {
  const { title, description, image } = route.params.producto;
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const agregarAlCarrito = () => {
    // Mostrar la alerta
    setMostrarAlerta(true);

    // Configurar para que la alerta desaparezca después de 2 segundos
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Alerta */}
      {mostrarAlerta && (
        <View style={styles.alerta}>
          <Text style={styles.alertaTexto}>Producto añadido al carrito</Text>
        </View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.colorOptions}>
        <View style={[styles.colorOption, { backgroundColor: '#FFFFFF' }]} />
        <View style={[styles.colorOption, { backgroundColor: '#F0F0F0' }]} />
        <View style={[styles.colorOption, { backgroundColor: '#C0C0C0' }]} />
        <View style={[styles.colorOption, { backgroundColor: '#A0A0A0' }]} />
        <View style={[styles.colorOption, { backgroundColor: '#2020A0' }]} />
      </View>
      <View style={styles.sizeOptions}>
        {['14', '20', '24', '32', '40', '42'].map(size => (
          <TouchableOpacity key={size} style={styles.sizeOption}>
            <Text style={styles.sizeText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Categoría:</Text>
          <Text style={styles.detailsValue}>Running</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Marca:</Text>
          <Text style={styles.detailsValue}>Nike</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Género:</Text>
          <Text style={styles.detailsValue}>Zapatillas para correr</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Existencias:</Text>
          <Text style={styles.detailsValue}>23</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Precio:</Text>
          <Text style={styles.detailsValue}>$24.95</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Material:</Text>
          <Text style={styles.detailsValue}>Tela</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Código:</Text>
          <Text style={styles.detailsValue}>C1200</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Descuento:</Text>
          <Text style={styles.detailsValue}>0%</Text>
        </View>
      </View>
      {/* Cambia el onPress del botón para llamar a la función agregarAlCarrito */}
      <TouchableOpacity style={styles.addButton} onPress={agregarAlCarrito}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetallesProductoScreen;
