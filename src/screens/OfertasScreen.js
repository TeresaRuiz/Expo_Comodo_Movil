import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TextInput, Alert, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/OfertasScreenStyles';
import PromoImage from '../img/ofertas.png';
import * as Constantes from '../utils/constantes';
import CardOferta from '../componets/Cards/CardOferta'; 
import { useInactividadSesion } from '../componets/Hooks/inactividad.js';

const OfertasScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { panHandlers, handleLogout } = useInactividadSesion();
  
  const ip = Constantes.IP;

  const fetchOfertas = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/producto.php?action=getProductosConDescuento`);
      const data = await response.json();
      if (data.status) {
        // Agrupar ofertas por id_producto
        const groupedOfertas = data.dataset.reduce((acc, oferta) => {
          if (!acc[oferta.id_producto]) {
            acc[oferta.id_producto] = {
              ...oferta,
              detalles: [{
                id_detalle: oferta.id_detalle_producto,
                color: oferta.color,
                talla: oferta.talla
              }]
            };
          } else {
            acc[oferta.id_producto].detalles.push({
              id_detalle: oferta.id_detalle_producto,
              color: oferta.color,
              talla: oferta.talla
            });
          }
          return acc;
        }, {});
        setOfertas(Object.values(groupedOfertas));
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las ofertas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOfertas();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOfertas();
  };

  const filteredOfertas = ofertas.filter(oferta =>
    oferta.nombre_descuento.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderOfertaItem = ({ item }) => (
    <CardOferta 
      oferta={item}
      onPress={() => navigation.navigate('DetallesProducto', { 
        idProducto: item.id_producto, 
        detalles: item.detalles 
      })}
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
          keyExtractor={item => `${item.id_producto}_${item.nombre_producto}`}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

export default OfertasScreen;