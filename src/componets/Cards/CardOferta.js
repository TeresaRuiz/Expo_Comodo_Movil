// CardOferta.js
import React from 'react'; // Importa React
import { View, Text, Image, TouchableOpacity } from 'react-native'; // Importa componentes de React Native
import styles from '../../estilos/OfertasScreenStyles'; // Asegúrate de que la ruta sea correcta
import * as Constantes from '../../utils/constantes'; // Importa constantes útiles

const ip = Constantes.IP; // Define la IP base para las imágenes

// Componente que representa una tarjeta de oferta
const CardOferta = ({ oferta, onPress }) => (
  <TouchableOpacity
    style={styles.ofertaCard} // Estilo de la tarjeta de oferta
    onPress={onPress} // Función que se ejecuta al presionar la tarjeta
  >
    <Image 
      source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${oferta.imagen}` }} // URL de la imagen de la oferta
      style={styles.ofertaImage} // Estilo de la imagen
    />
    <View style={styles.ofertaDetails}> {/* Contenedor de los detalles de la oferta */}
      <Text style={styles.ofertaTitle}>{oferta.nombre_producto}</Text> {/* Nombre del producto */}
      <Text style={styles.ofertaDescription}>{oferta.nombre_genero}</Text> {/* Género del producto */}
      <View style={styles.ofertaPriceContainer}> {/* Contenedor para el precio y descuentos */}
        <Text style={styles.ofertaPrice}>${oferta.precio}</Text> {/* Precio del producto */}
        <Text style={styles.discountText}>-{oferta.valor}%</Text> {/* Descuento aplicable */}
        {oferta.descuento > 0 && ( // Muestra el badge de descuento si hay un descuento
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{oferta.descuento}%</Text> {/* Descuento adicional */}
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export default CardOferta; // Exporta el componente
