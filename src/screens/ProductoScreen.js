import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductoScreen = ({ navigation }) => {
  const products = [
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      sizes: ['14', '20', '32'],
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      sizes: ['14', '20', '32'],
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      sizes: ['14', '20', '32'],
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      sizes: ['14', '20', '32'],
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus productos..."
          style={styles.searchInput}
        />
      </View>

      <View style={styles.grid}>
        {products.map((product, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.cardImage} />
            <View style={styles.sizeContainer}>
              {product.sizes.map((size, index) => (
                <Text key={index} style={styles.sizeBadge}>{size}</Text>
              ))}
            </View>
            <Text style={styles.cardTitle}>{product.title}</Text>
            <Text style={styles.cardDescription}>{product.description}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  sizeBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductoScreen;
