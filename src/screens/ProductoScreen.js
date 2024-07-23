import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilos/ProductoScreenStyles'; // Asegúrate de que la ruta es correcta
import Cards1 from '../componets/Cards1'; // Asegúrate de que la ruta es correcta

const ProductoScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false); // Ajusta según tus necesidades

  const products = [
    {
      title: 'Tenis Adidas',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://originalselsalvador.com/wp-content/uploads/2024/01/calzado-blazer-mid-77-vintage-nw30B2-min.png',
    },
    {
      title: 'Tenis Ardidas',
      description: 'Zapatos cómodos y deportivos',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/calzado-air-force-1-07-jBrhbr.png',
    },
    // Añade más productos si es necesario
  ];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus productos..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.grid}>
          {filteredProducts.map((product, index) => (
            <Cards1
              key={index}
              item={product}
              onPress={() => navigation.navigate('DetallesProducto', { producto: product })}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ProductoScreen;
