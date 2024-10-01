import React from 'react'; // Importa React
import { View, Text, Image, TouchableOpacity } from 'react-native'; // Importa componentes de React Native
import styles from '../../estilos/ProductoScreenStyles'; // Asegúrate de que la ruta es correcta
import Button2 from '../Buttons/Button2'; // Asegúrate de que la ruta es correcta

// Componente que representa una tarjeta de producto
const Cards1 = ({ item, onPress }) => {
  return (
    <View style={styles.card}> {/* Contenedor de la tarjeta */}
      <Image source={{ uri: item.image }} style={styles.cardImage} /> {/* Imagen del producto */}
      <Text style={styles.cardTitle}>{item.title}</Text> {/* Título del producto */}
      <Text style={styles.cardDescription}>{item.description}</Text> {/* Descripción del producto */}
      <Button2
        title="Ver más" // Texto del botón
        onPress={onPress} // Función que se ejecuta al presionar el botón
        style={styles.button} // Estilo del botón
        textStyle={styles.buttonText} // Estilo del texto del botón
      />
    </View>
  );
};

export default Cards1; // Exporta el componente
