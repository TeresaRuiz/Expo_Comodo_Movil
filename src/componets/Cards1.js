import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button2 from './Button2'; // Asegúrate de que la ruta aquí sea correcta
import styles from '../estilos/ProductoScreenStyles';

const Cards1 = ({ products }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.grid}>
      {products.map((product, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: product.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{product.title}</Text>
          <Text style={styles.cardDescription}>{product.description}</Text>
          <Button2
            title="Ver más"
            onPress={() => navigation.navigate('DetallesProducto', { producto: product })}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      ))}
    </View>
  );
};

export default Cards1;
