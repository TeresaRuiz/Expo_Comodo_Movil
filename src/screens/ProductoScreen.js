import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProductoScreen = () => {
  const navigation = useNavigation();

  const products = [
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://originalselsalvador.com/wp-content/uploads/2024/01/calzado-blazer-mid-77-vintage-nw30B2-min.png',
    },
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/calzado-air-force-1-07-jBrhbr.png',
    },
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/022c7053-5c55-4bc4-8cdc-72c6e8f95a5e/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP.png',
    },
    {
      title: 'Tenis NIKE',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c20afd60-b230-4815-bfd2-6768c875f6cd/calzado-air-force-1-07-J7xw5P.png',
    },
  ];

  const handleVerMas = (producto) => {
    navigation.navigate('DetallesProducto', { producto });
  };

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
            <Text style={styles.cardTitle}>{product.title}</Text>
            <Text style={styles.cardDescription}>{product.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DetallesProducto', { producto: product })}
            >
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
    backgroundColor: '#F8F9FB',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize:
      16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductoScreen;
