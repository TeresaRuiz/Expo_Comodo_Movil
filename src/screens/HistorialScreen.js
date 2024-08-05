import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/HistorialScreenStyles'; // Importa los estilos desde un archivo externo

const HistorialScreen = ({ navigation }) => {
  

  // Función para renderizar cada elemento de la lista de ofertas
  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={() => navigation.navigate('DetallesProducto', { producto: item })}
    >
      <Image source={{ uri: item.image }} style={styles.ofertaImage} />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
        <Text style={styles.ofertaDescription}>Cantidad:{item.cantidad}</Text>
        <Text style={styles.fecha}>{item.fecha_reserva}</Text>
        <Text style={styles.subTotal}>{item.subtotal}</Text>
        <View style={styles.ofertaPriceContainer}>
          <Text style={styles.ofertaPrice}>${item.price.toFixed(2)}</Text>
          {/* Renderiza un badge de descuento si el producto tiene descuento */}
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
      {/* Título de la pantalla */}
      <Text style={styles.title}>Historial</Text>
      
      {/* Lista de ofertas usando FlatList */}
      <FlatList
        data={ofertas}
        renderItem={renderOfertaItem} // Renderiza cada elemento de la lista utilizando la función renderOfertaItem
        keyExtractor={item => item.id} // Utiliza el id del elemento como clave única
        contentContainerStyle={styles.listContainer} // Aplica estilos al contenedor de la lista
      />
    </View>
  );
};

export default HistorialScreen;
