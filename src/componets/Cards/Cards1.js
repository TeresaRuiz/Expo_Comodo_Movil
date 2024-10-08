import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../estilos/CategoriaScreenStyles';
import Button2 from '../Buttons/Button2';

const Cards1 = ({ item, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
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