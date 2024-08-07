// OfertasScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/OfertasScreenStyles';
import PromoImage from '../img/ofertas.png';
import * as Constantes from '../utils/constantes';
import CardOferta from '../componets/Cards/CardOferta'; 

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

  const filteredOfertas = ofertas
    .filter(oferta =>
      oferta.nombre_descuento.toLowerCase().includes(searchText.toLowerCase())
    )
    .reduce((unique, o) => {
      if (!unique.some(of => of.id_producto === o.id_producto)) {
        unique.push(o);
      }
      return unique;
    }, []);

  const renderOfertaItem = ({ item }) => (
    <CardOferta 
      oferta={item}
      onPress={() => navigation.navigate('DetallesProducto', { idProducto: item.id_producto })}
    />
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
          keyExtractor={item => `${item.id_producto}_${item.nombre_producto}`} // Asegurando unicidad
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default OfertasScreen;
