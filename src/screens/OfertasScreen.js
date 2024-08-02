import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/OfertasScreenStyles';
import PromoImage from '../img/ofertas.png';
import * as Constantes from '../utils/constantes';

const OfertasScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  const ip = Constantes.IP;

  const fetchOfertas = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/producto.php?action=getProductosConDescuento`);
      const data = await response.json();
      if (data.status) {
        setOfertas(data.dataset);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las ofertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfertas();
  }, []);

  const filteredOfertas = ofertas.filter(oferta =>
    oferta.nombre_descuento.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={() => navigation.navigate('DetallesProducto', { idProducto: item.id_producto })}
    >
      <Image source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${item.imagen}` }} style={styles.ofertaImage} />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
        <Text style={styles.ofertaDescription}>{item.nombre_genero}</Text>
        <View style={styles.ofertaPriceContainer}>
          <Text style={styles.ofertaPrice}>${item.precio}</Text>
          <Text style={styles.discountText}>-{item.valor}%</Text>
          {item.descuento > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.descuento}%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={PromoImage} style={styles.promoImage} />
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus ofertas..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredOfertas.length === 0 ? (
        <Text style={styles.noOfertasText}>No hay ofertas disponibles</Text>
      ) : (
        <FlatList
          data={filteredOfertas}
          renderItem={renderOfertaItem}
          keyExtractor={item => item.id_producto.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default OfertasScreen;
