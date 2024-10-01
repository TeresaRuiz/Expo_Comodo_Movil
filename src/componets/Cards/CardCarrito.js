import React from 'react'; // Importa React
import { View, Text, TouchableOpacity, Image } from 'react-native'; // Importa componentes de React Native
import styles from '../../estilos/CarritoScreenStyles'; // Asegúrate de la ruta correcta
import * as Constantes from '../../utils/constantes'; // Importa constantes útiles

const ip = Constantes.IP; // Define la URL base para las imágenes

// Componente que representa una tarjeta de producto en el carrito
const CardCarrito = ({ item, onIncrease, onDecrease, onDelete }) => {
  const imageUrl = `${ip}/Expo_Comodo/api/images/productos/${item.imagen}`; // URL de la imagen del producto

  return (
    <TouchableOpacity style={styles.ofertaCard}> {/* Tarjeta del carrito */}
      <Image source={{ uri: imageUrl }} style={styles.ofertaImage} /> {/* Imagen del producto */}

      <View style={styles.ofertaDetails}> {/* Contenedor para los detalles del producto */}
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text> {/* Nombre del producto */}
        <Text style={styles.ofertaPrice}>Precio Unitario: ${item.precio_unitario}</Text> {/* Precio unitario del producto */}
        {item.valor_oferta && ( // Muestra el valor de la oferta si está disponible
          <Text style={styles.ofertaPrice}>Oferta: %{item.valor_oferta}</Text>
        )}
        <View style={styles.quantityContainer}> {/* Contenedor para la cantidad y botones */}
          <TouchableOpacity 
            style={styles.quantityButton} // Estilo del botón de disminuir cantidad
            onPress={() => onDecrease(item)} // Disminuye la cantidad
          >
            <Text style={styles.quantityButtonText}>-</Text> {/* Botón para disminuir */}
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.cantidad}</Text> {/* Muestra la cantidad actual */}
          <TouchableOpacity 
            style={styles.quantityButton} // Estilo del botón de aumentar cantidad
            onPress={() => onIncrease(item)} // Aumenta la cantidad
          >
            <Text style={styles.quantityButtonText}>+</Text> {/* Botón para aumentar */}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton} // Estilo del botón de eliminar
            onPress={() => onDelete(item.id_detalle_reserva)} // Elimina el producto del carrito
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Eliminar</Text> {/* Botón para eliminar */}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCarrito; // Exporta el componente
