import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HistorialScreen = ({ navigation }) => {
  const ofertas = [
    {
      id: '1',
      title: 'Zapatillas Deportivas Nike',
      description: 'Cantidad : 4',
      fecha: '16/02/24',
      image: 'https://i.pinimg.com/736x/2a/cf/5f/2acf5f8b73e26f38bc018e0bafb70875.jpg',
      price: 49.95,
    },
    {
      id: '2',
      title: 'Sandalias Verano Adidas',
      description: 'Cantidad: 2',
      fecha: '16/02/24',
      image: 'https://i.pinimg.com/564x/dc/16/1b/dc161b4d8cb4a0df94f6c15b613aaf3d.jpg',
      price: 29.99,
    },
    {
      id: '3',
      title: 'Sandalias Verano Adidas',
      description: 'Cantidad: 1',
      fecha: '16/02/24',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c20afd60-b230-4815-bfd2-6768c875f6cd/calzado-air-force-1-07-J7xw5P.png',
      price: 29.99,
    },
    {
      id: '4',
      title: 'Sandalias Verano Adidas',
      description: 'Cantidad: 5',
      fecha: '16/02/24',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/022c7053-5c55-4bc4-8cdc-72c6e8f95a5e/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP.png',
      price: 29.99,
    },
    {
      id: '5',
      title: 'Sandalias Verano Adidas',
      description: 'Cantidad. 3',
      fecha: '16/02/24',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/calzado-air-force-1-07-jBrhbr.png',
      price: 29.99,
    },
    {
      id: '6',
      title: 'Sandalias Verano Adidas',
      description: 'Cantidad: 2',
      fecha: '16/02/24',
      image: 'https://originalselsalvador.com/wp-content/uploads/2024/01/calzado-blazer-mid-77-vintage-nw30B2-min.png',
      price: 29.99,
    },
    {
      id: '7',
      title: 'Sandalias Verano Adidas',
      description: 'Cantidad: 1',
      fecha: '16/02/24',
      image: 'https://i.pinimg.com/564x/dc/16/1b/dc161b4d8cb4a0df94f6c15b613aaf3d.jpg',
      price: 29.99,
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
        <Text style={styles.fecha}>{item.fecha}</Text>
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
      <Text style={styles.title}>Historial</Text>
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
    marginTop: 50, // Ajusta el margen superior para mover todo hacia abajo
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20, // Reduce el margen inferior
    color: '#333', // dark grey color for the title
    textAlign: 'center', // Center the text
    marginTop: 40, // Reduce el margen superior para mover el título más arriba
  },
  ofertaCard: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10, // Reduce el margen inferior para menos separación entre tarjetas
    padding: 10,
  },
  ofertaImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  fecha: {
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
    backgroundColor: '#3046BC',
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
export default HistorialScreen;
