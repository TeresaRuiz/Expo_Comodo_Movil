// CardHistorial.js
import React from 'react'; // Importa React
import { View, Text, Image, TouchableOpacity } from 'react-native'; // Importa componentes de React Native
import styles from '../../estilos/HistorialScreenStyles'; // Asegúrate de que la ruta sea correcta
import * as Constantes from '../../utils/constantes'; // Importa constantes útiles

const ip = Constantes.IP; // Define la IP base para las imágenes

// Componente que representa una tarjeta de historial
const CardHistorial = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.ofertaCard} // Estilo de la tarjeta de historial
    onPress={onPress} // Función que se ejecuta al presionar la tarjeta
  >
    <Image 
      source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${item.imagen}` }} // URL de la imagen del producto
      style={styles.ofertaImage} // Estilo de la imagen
    />
    <View style={styles.ofertaDetails}> {/* Contenedor de los detalles del historial */}
      <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text> {/* Nombre del producto */}
      <Text style={styles.ofertaDescription}>Cantidad: {item.cantidad}</Text> {/* Cantidad comprada */}
      <Text style={styles.fecha}>{item.fecha_reserva}</Text> {/* Fecha de la reserva */}
      <Text style={styles.subTotal}>Subtotal: ${(item.cantidad * item.precio_unitario)}</Text> {/* Cálculo del subtotal */}
      <View style={styles.ofertaPriceContainer}> {/* Contenedor para el precio y descuentos */}
        <Text style={styles.ofertaPrice}>${item.precio_unitario}</Text> {/* Precio unitario del producto */}
        {item.valor_oferta > 0 && ( // Muestra el badge de descuento si hay un descuento
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.valor_oferta}%</Text> {/* Descuento aplicable */}
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export default CardHistorial; // Exporta el componente
