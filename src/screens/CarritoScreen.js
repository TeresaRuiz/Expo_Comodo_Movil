import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../utils/constantes';
import LibroItem from '../estilos/CarritoScreenStyles';


const CarritoScreen = () => {

  const [dataLibros, setDataLibros] = useState([]);
  const navigation = useNavigation();
  const [quantityProducts, setQuantityProducts] = useState('');
  
  const PEDIDO_API = 'services/public/pedido.php';
  const [error, setError] = useState(null);

  const fillProducts = async () => {
    try {
      const data = await fetchData(PEDIDO_API, 'readDetail');
      if (data.status) {
        setDataLibros(data.dataset);
        setQuantityProducts(data.message);
        console.log("Lista de carrito "+dataLibros);
      }
      else {
        setDataLibros([]);
        setQuantityProducts('Existen 0 coincidencias');
      }
    }
    catch (error) {
      setError(error);
    }
  }
  const handleLibrosPress = (libroId) => {
    console.log("ID: ", libroId);
    if (!libroId) {
      alert('No se pudieron cargar los libros');
      return;
    }
    navigation.navigate('NavStack', { screen: 'DetalleL', params: { libroId } });
  }
  useEffect(() => {
    fillProducts();
  }, []);

  const renderLibrosItem = ({ item }) => (
    <LibroItem item={item} onPress={handleLibrosPress} />
  );

  
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <FlatList
        data={dataLibros}
        renderItem={renderLibrosItem}
        keyExtractor={(item) => item.id_detalle}
        numColumns={2}>
      </FlatList>
      <View style={styles.grid}>
       
      </View>
    </ScrollView>
  );
};

export default CarritoScreen;
