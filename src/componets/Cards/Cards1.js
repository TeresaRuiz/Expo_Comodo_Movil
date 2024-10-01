import React from 'react'; // Importa React
import { View, Text, Image } from 'react-native'; // Importa componentes de React Native
import styles from '../../estilos/CategoriaScreenStyles'; // Asegúrate de que la ruta es correcta
import Button2 from '../Buttons/Button2'; // Asegúrate de que la ruta es correcta

// Componente que representa una tarjeta de categoría
const Cards1 = ({ item, onPress }) => {
  return (
    <View style={styles.card}> {/* Contenedor de la tarjeta */}
      <Image source={{ uri: item.image }} style={styles.cardImage} /> {/* Imagen de la categoría */}
      <Text style={styles.cardTitle}>{item.title}</Text> {/* Título de la categoría */}
      <Button2
        title="Ver más" // Texto del botón para ver más detalles
        onPress={onPress} // Función que se ejecuta al presionar el botón
        style={styles.button} // Estilo del botón
        textStyle={styles.buttonText} // Estilo del texto del botón
      />
    </View>
  );
};

export default Cards1; // Exporta el componente
