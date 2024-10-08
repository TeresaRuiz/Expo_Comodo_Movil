import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../estilos/ProductoScreenStyles';
import Button2 from '../Buttons/Button2';

const Cards1 = ({ item, onPress }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Button2
        title="Ver más"
        onPress={onPress}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default Cards1;