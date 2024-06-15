import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CarritoScreen from './CarritoScreen'; // Importa la pantalla CarritoScreen

const DetallesProductoScreen = ({ route, navigation }) => {
  const { title, description, image } = route.params.producto;

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      {/* Cambia el onPress del botón para que navegue a CarritoScreen */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Carrito')}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 42,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sizeOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sizeText: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#3046BC',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DetallesProductoScreen;
