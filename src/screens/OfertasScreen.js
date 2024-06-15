import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OfertasScreen = ({ navigation }) => {
  const ofertas = [
    {
      id: '1',
      title: 'Zapatillas Deportivas Nike',
      description: 'Zapatillas ideales para correr, disponibles en varios colores.',
      image: 'https://i.pinimg.com/736x/2a/cf/5f/2acf5f8b73e26f38bc018e0bafb70875.jpg',
      price: 49.95,
      discount: 30,
    },
    {
      id: '2',
      title: 'Sandalias Verano Adidas',
      description: 'Sandalias cómodas y resistentes para el verano.',
      image: 'https://i.pinimg.com/564x/dc/16/1b/dc161b4d8cb4a0df94f6c15b613aaf3d.jpg',
      price: 29.99,
      discount: 20,
    },
  ];

  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={() => navigation.navigate('DetallesProducto', { producto: item })}
    >
      <Image source={{ uri: item.image }} style={styles.ofertaImage} />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.title}</Text>
        <Text style={styles.ofertaDescription}>{item.description}</Text>
        <View style={styles.ofertaPriceContainer}>
          <Text style={styles.ofertaPrice}>${item.price.toFixed(2)}</Text>
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ofertas}
        renderItem={renderOfertaItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  ofertaCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  ofertaImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  ofertaDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  ofertaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  ofertaDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  ofertaPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ofertaPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  discountBadge: {
    backgroundColor: '#FF6347',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  discountText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default OfertasScreen;
