import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../api/components';
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FB',
    paddingVertical: 60, // Reducido el espacio vertical
    paddingHorizontal: 15,
  },
  
  searchContainer: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 50,
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
    width: '100%',
    height: 200,
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
    marginRight: 230,
    width: 120,
    height: 160,
    borderRadius: 20,
    marginBottom: 15,
  },
  cardTitle: {
    marginTop:  -160,
    marginLeft: 90,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 16,
    marginLeft: 80,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  cardCantidad:{
    marginLeft: 50,
    marginTop: -10,
    color: '#555',

  },
  button: {
    marginTop: 20,
    marginLeft: 60,
    backgroundColor: '#5981CF',
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

export default CarritoScreen;
