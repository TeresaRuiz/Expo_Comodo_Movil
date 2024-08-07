// OfertasScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/OfertasScreenStyles';
import PromoImage from '../img/ofertas.png';
import * as Constantes from '../utils/constantes';
import CardOferta from '../componets/Cards/CardOferta'; 

const OfertasScreen = ({ navigation }) => {
  // Estados para manejar la búsqueda, las ofertas y el estado de carga
  const [searchText, setSearchText] = useState('');
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
// Obtener la dirección IP de las constantes
  const ip = Constantes.IP;
// Función para obtener las ofertas desde la API
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
// Efecto para cargar las ofertas al montar el componente
  useEffect(() => {
    fetchOfertas();
  }, []);
// Filtrar y eliminar duplicados de las ofertas basándose en el texto de búsqueda
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
// Función para renderizar cada item de oferta
  const renderOfertaItem = ({ item }) => (
    <CardOferta 
      oferta={item}
      onPress={() => navigation.navigate('DetallesProducto', { idProducto: item.id_producto })}
    />
  );

  return (
    <View style={styles.container}>
        {/* Imagen promocional */}
      <Image source={PromoImage} style={styles.promoImage} />
       {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus ofertas..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
       {/* Renderizado condicional basado en el estado de carga y las ofertas disponibles */}
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
