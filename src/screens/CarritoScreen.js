import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const CarritoScreen = ({ navigation }) => {
  const ofertas = [
    {
      id: '1',
      title: 'Tenis NIKE',
      image: 'https://originalselsalvador.com/wp-content/uploads/2024/01/calzado-blazer-mid-77-vintage-nw30B2-min.png',
      description: 'Subtotal',
      price: 49.95,
    },
    {
      id: '2',
      title: 'Tenis NIKE',
      description: 'Subtotal',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/calzado-air-force-1-07-jBrhbr.png',
      price: 69.99,
    },
    {
      id: '3',
      title: 'Tenis NIKE',
      description: 'Subtotal',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c20afd60-b230-4815-bfd2-6768c875f6cd/calzado-air-force-1-07-J7xw5P.png',
      price: 79.99,
    },
    {
      id: '4',
      title: 'Tenis NIKE',
      description: 'Subtotal',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/022c7053-5c55-4bc4-8cdc-72c6e8f95a5e/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP.png',
      price: 99.99,
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
          <Text style={styles.addButtonText}>+</Text>
          <Text style={styles.ofertaTitle4}>7</Text>
          <Text style={styles.addButtonText2}>−</Text>
          <Text style={styles.ofertaPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={ofertas}
        renderItem={renderOfertaItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {/* Botón "Finalizar Compra" */}
      <TouchableOpacity style={styles.finalizarCompraButton}>
        <Text style={styles.finalizarCompraText}>Finalizar Compra</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 60,
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
    marginRight: 10,
  },
  addButtonText: {
    borderRadius: 10,
    width: 30,
    height: 30,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'black',
  },
  addButtonText2: {
    marginRight: 100,
    borderRadius: 10,
    width: 30,
    height: 30,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'black',
  },
  ofertaTitle4: {
    marginRight: 10,
    marginLeft: 10,
  },
  finalizarCompraButton: {
    backgroundColor: '#283AE2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  finalizarCompraText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarritoScreen;
