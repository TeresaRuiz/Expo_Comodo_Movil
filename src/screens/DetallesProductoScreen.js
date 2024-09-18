import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../estilos/DetallesProductosScreen';
import * as Constantes from '../utils/constantes';
import { useInactividadSesion } from '../componets/Hooks/inactividad.js';

// Componente funcional para mostrar los detalles del producto
const DetallesProductoScreen = () => {
  const { panHandlers, handleLogout } = useInactividadSesion();
  const navigation = useNavigation(); // Hook para manejar la navegación
  const route = useRoute(); // Hook para obtener la ruta actual y sus parámetros
  const { idProducto, id_detalle } = route.params; // Extraer el id del producto de los parámetros de la ruta
  console.log(id_detalle);
  const [producto, setProducto] = useState(null); // Estado para almacenar los detalles del producto
  const [loading, setLoading] = useState(true); // Estado para controlar la animación de carga
  const [cantidadProducto, setCantidadProducto] = useState(''); // Estado para almacenar la cantidad del producto que se va a agregar al carrito

  const ip = Constantes.IP; // IP del servidor obtenida de las constantes

  // Función para obtener los detalles del producto desde la API
  const fetchProducto = async () => {
    try {
      const formData = new FormData(); // Crear un objeto FormData para enviar el id del producto
      formData.append('idProducto', idProducto); // Añadir el idProducto al FormData
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/producto.php?action=readOne`, {
        method: 'POST', // Usar el método POST para la solicitud
        body: formData, // Enviar el FormData en el cuerpo de la solicitud
      });
      const data = await response.json(); // Convertir la respuesta a formato JSON
      if (data.status) {
        setProducto(data.dataset); // Si la respuesta es exitosa, actualizar el estado con los datos del producto
      } else {
        Alert.alert('Error', data.message); // Si hay un error, mostrar una alerta con el mensaje
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los detalles del producto'); // Manejar errores en la solicitud
    } finally {
      setLoading(false); // Finalizar la animación de carga
    }
  };

  // useEffect para ejecutar fetchProducto cuando el componente se monta
  useEffect(() => {
    fetchProducto(); // Llamar a la función para obtener los detalles del producto
  }, []); // La dependencia vacía asegura que esto solo se ejecute una vez cuando el componente se monta

  async function agregarAlCarrito(idProducto, cantidadNumerica) {
    try {
        // Obtener el carrito almacenado en AsyncStorage
        const carritoData = await AsyncStorage.getItem('@carrito');
        let carrito = carritoData ? JSON.parse(carritoData) : []; // Convertirlo a objeto o crear un nuevo array
        
        // Calcular la cantidad total del producto en el carrito
        const cantidadEnCarrito = carrito.reduce((total, item) => {
            return item.idProducto === idProducto ? total + item.cantidad : total;
        }, 0);

        // Verificar si la cantidad total supera las existencias
        const existenciasDisponibles = await obtenerExistencias(idProducto); // Función para obtener existencias del servidor
        if (cantidadEnCarrito + cantidadNumerica > existenciasDisponibles) {
            Alert.alert('Error', 'La cantidad ingresada sobrepasa la disponibilidad del producto');
            return; // Salir de la función si hay un error
        }

        // Si todo está bien, proceder a agregar al carrito
        const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=createDetail`, {
          method: 'POST', // Usar el método POST para la solicitud
          body: formData, // Enviar el FormData en el cuerpo de la solicitud
      });

      const data = await response.json(); // Convertir la respuesta a formato JSON

      // Verificar la respuesta del servidor
      if (data.status) {
          // Actualiza el carrito en AsyncStorage
          const carritoData = await AsyncStorage.getItem('@carrito'); // Obtener el carrito almacenado en AsyncStorage
          let carrito = carritoData ? JSON.parse(carritoData) : []; // Si existe, convertirlo a objeto, sino, crear un nuevo array
          carrito.push({ idProducto, cantidad: cantidadNumerica }); // Añadir el producto al carrito
          await AsyncStorage.setItem('@carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado en AsyncStorage

          // Mostrar mensaje de éxito y navegar al carrito
          Alert.alert('Éxito', 'Producto añadido al carrito', [
              { text: 'OK', onPress: () => navigation.navigate('Carrito') }, // Navegar al carrito si el usuario presiona "OK"
          ]);
      } else {
          // Si la respuesta indica un error, muestra el mensaje de error
          Alert.alert('Error', data.message || 'La cantidad ingresada sobrepasa la disponibilidad del producto'); // Mostrar mensaje de error
      }
  } catch (error) {
      console.error(error); // Mostrar el error en la consola
      Alert.alert('Error', 'Ocurrió un error al agregar el producto al carrito'); // Mostrar una alerta en caso de error
  }
};

// Función para obtener las existencias disponibles del servidor
async function obtenerExistencias(idProducto) {
    const response = await fetch(`${ip}/Expo_Comodo/api/services/public/producto.php?action=getStock&id=${idProducto}`);
    const data = await response.json();
    return data.stock; // Asegúrate de que esta propiedad contenga las existencias disponibles
}

  // Mostrar un indicador de carga mientras los datos del producto se están cargando
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" /> 
      </View>
    );
  }

  // Si no se encuentran detalles del producto, mostrar un mensaje de error
  if (!producto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron detalles del producto</Text> 
      </View>
    );
  }

  // Renderizar la interfaz de usuario con los detalles del producto
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> 
        <Ionicons name="arrow-back" size={24} color="#000" /> 
      </TouchableOpacity>
      <Image source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${producto.imagen}` }} style={styles.image} /> 
      <Text style={styles.title}>{producto.nombre_producto}</Text> 
      <Text style={styles.description}>{producto.descripcion_detalle}</Text> 
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Marca:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_marca}</Text> 
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Código del zapato:</Text>
          <Text style={styles.detailsValue}>{producto.codigo_interno}</Text> 
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Género del zapato:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_genero}</Text> 
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Material:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_material}</Text> 
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Talla:</Text>
          <Text style={styles.detailsValue}>{producto.nombre_talla}</Text> 
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Color:</Text>
          <Text style={styles.detailsValue}>{producto.color}</Text> 
        </View>
      </View>
      <View style={styles.pricingInfoContainer}>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Precio unitario (US$):</Text>
          <Text style={styles.pricingInfoValue}>{producto.precio}</Text> 
        </View>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Existencias:</Text>
          <Text style={styles.pricingInfoValue}>{producto.existencias}</Text> 
        </View>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Descuento %:</Text>
          <Text style={styles.pricingInfoValue}>{producto.porcentaje_descuento}</Text> 
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="numeric"
            onChangeText={setCantidadProducto} // Actualizar la cantidad de producto en el estado
            value={cantidadProducto.toString()} // Mostrar el valor actual de cantidadProducto
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={agregarAlCarrito}> 
        <Text style={styles.addButtonText}>Agregar al carrito</Text> 
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetallesProductoScreen;
