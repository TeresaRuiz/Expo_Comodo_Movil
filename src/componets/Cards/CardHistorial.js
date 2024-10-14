import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../estilos/HistorialScreenStyles';
import * as Constantes from '../../utils/constantes';

const ip = Constantes.IP;

const CardHistorial = ({ item, onPress }) => {
  // Calcular subtotal con descuento aplicado (si existe)
  const subtotalProducto = item.cantidad * item.precio_unitario;
  const descuento = item.valor_oferta ? (subtotalProducto * item.valor_oferta) / 100 : 0;
  const subtotalConDescuento = subtotalProducto - descuento;

  return (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={onPress}
    >
      <Image 
        source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${item.imagen}` }}
        style={styles.ofertaImage}
      />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
        <Text style={styles.ofertaDescription}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.fecha}>{item.fecha_reserva}</Text>
        <Text style={styles.subTotal}>Subtotal: ${subtotalConDescuento}</Text>
        <View style={styles.ofertaPriceContainer}>
          <Text style={styles.ofertaPrice}>${item.precio_unitario}</Text>
          {item.valor_oferta > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.valor_oferta}%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardHistorial;
