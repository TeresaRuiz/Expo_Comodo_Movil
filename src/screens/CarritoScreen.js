import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
        <Text style={styles.title}>Carrito</Text>
      {/* Imagen de "Promo" */}
     <FlatList
        data={ofertas}
        renderItem={renderOfertaItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    listContainer: {
      paddingVertical: 20, // Reduce el padding vertical para mover las tarjetas más arriba
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20, // Reduce el margen inferior
      color: '#333', // dark grey color for the title
      textAlign: 'center', // Center the text
      marginTop: 60, // Reduce el margen superior para mover el título más arriba
    },
    ofertaCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 10, // Reduce el margen inferior para menos separación entre tarjetas
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
  
  export default CarritoScreen;