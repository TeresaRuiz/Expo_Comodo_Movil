
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono
import * as Constantes from "../../utils/constantes";

//recibimos por props la imagen del producto, nombre, precio y otras propiedades de productos para mostrarlas en el componente de 
//productoCard


export default function CarritoCard({ item, onPress }) {
  return (
    //Plantilla de las tarjetas de libros
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${Constantes.IP}/Expo_Comodo/api/images/productos/${item.imagen}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      <Text style={styles.textTitle}>{item.nombre_producto}</Text>
      <Text style={styles.textPrecio}>Producto: <Text style={styles.textDentro}>{item.nombre_producto}</Text></Text>
      <Text style={styles.textPrecio}>Precio: <Text style={styles.textDentro}>${item.precio_unitario}</Text></Text>
      <Text style={styles.textPrecio}>Cantidad: <Text style={styles.textDentro}>{item.cantidad}</Text></Text>
      <TouchableOpacity onPress={() => onPress(item.id_producto)} style={styles.buton}>
        <Text>Ver mas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteDetalleCarrito(item.id_detalle_reserva)} style={styles.buton2}>
        <Text>Eliminar</Text>
      </TouchableOpacity>
    </View>

  );
}
//Diseño y estilo de las tarjetas
const styles = StyleSheet.create({
    containerFlat: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    image: {
        marginRight: 250,
        width: 200,
        height: 150,
        borderRadius: 30,
        marginBottom: 15,
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#F8F9FB',
        paddingVertical: 60, // Reducido el espacio vertical
        paddingHorizontal: 15,
      },
    card: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    buton: {
        marginTop: 5,
        marginLeft:230,
        backgroundColor: '#5981CF',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    
    buton2: {
        marginTop: -40,
        backgroundColor: '#5981CF',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },

   
    textTitle: {
        marginTop: -170,
        marginLeft: 90,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#333',
    },
    textPrecio: {
        fontSize: 15,
        marginLeft: 80,
        color: '#555',
        textAlign: 'center',
        marginBottom: 15,
    },
});
