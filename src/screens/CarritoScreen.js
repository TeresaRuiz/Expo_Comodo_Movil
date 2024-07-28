import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, Image } from 'react-native';
import styles from '../estilos/CarritoScreenStyles'; // Importa los estilos desde un archivo externo
import Button2 from '../componets/Buttons/Button2'; // Importa el componente del botón
import * as Constantes from '../utils/constantes';

const CarritoScreen = ({ navigation }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [descuento, setDescuento] = useState(0);

  const ip = Constantes.IP;

  // Función para obtener los detalles del carrito desde la API
  const fetchCarrito = useCallback(async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=readDetail`);
      const data = await response.json();
      if (data.status) {
        setCarrito(data.dataset);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los datos del carrito');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [ip]);

  // Función para manejar el cambio de cantidad de un producto en el carrito
  const handleQuantityChange = async (item, type) => {
    let newCantidad = item.cantidad;

    if (type === 'increase') {
      newCantidad++;
    } else if (type === 'decrease') {
      newCantidad--;
    }

    if (newCantidad < 1) return;

    try {
      const formData = new FormData();
      formData.append('idDetalle', item.id_detalle_reserva.toString());
      formData.append('cantidadProducto', newCantidad.toString());

      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 1) {
        setCarrito(prevCarrito => (
          prevCarrito.map(producto =>
            producto.id_detalle_reserva === item.id_detalle_reserva ? { ...producto, cantidad: newCantidad } : producto
          )
        ));
        Alert.alert('Éxito', data.message);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un problema al actualizar la cantidad del producto');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar la cantidad del producto');
      console.error(error);
    }
  };

  // Función para eliminar un producto del carrito
  const handleDelete = async (idDetalle) => {
    try {
      const formData = new FormData();
      formData.append('idDetalle', idDetalle);

      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=deleteDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 1) {
        const updatedCarrito = carrito.filter(producto => producto.id_detalle_reserva !== idDetalle);
        setCarrito(updatedCarrito);
        Alert.alert('Éxito', data.message);

        if (updatedCarrito.length === 0) {
          // Acciones si el carrito está vacío
        }
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un problema al eliminar el producto');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al eliminar el producto del carrito');
      console.error(error);
    }
  };

  // Función para manejar el evento de refrescar
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCarrito();
  }, [fetchCarrito]);

  // Efecto para cargar los detalles del carrito al cargar la pantalla
  useEffect(() => {
    fetchCarrito();
  }, [fetchCarrito]);

  // Efecto para calcular el subtotal y aplicar descuentos cada vez que el carrito cambie
  useEffect(() => {
    const calcularSubtotal = () => {
      let total = 0;
      let descuentoTotal = 0;

      carrito.forEach(item => {
        const subtotalProducto = item.precio_unitario * item.cantidad;

        if (item.valor_oferta) {
          const subtotalConDescuento = subtotalProducto - (subtotalProducto * item.valor_oferta) / 100;
          total += subtotalConDescuento;
          descuentoTotal += subtotalProducto - subtotalConDescuento;
        } else {
          total += subtotalProducto;
        }
      });

      setSubtotal(total);
      setDescuento(descuentoTotal);
    };

    calcularSubtotal();
  }, [carrito]);

  // Renderizar cada elemento del carrito
  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity style={styles.ofertaCard}>
      <Image source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${item.imagen}` }} style={styles.ofertaImage} />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
        <Text style={styles.ofertaPrice}>Precio Unitario: ${item.precio_unitario}</Text>
        {item.valor_oferta && (
          <Text style={styles.ofertaPrice}>Oferta: %{item.valor_oferta}</Text>
        )}
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item, 'decrease')}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.cantidad}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item, 'increase')}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id_detalle_reserva)}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        <Button2
          title="Comprar"
          onPress={() => handleBuy(item)}
          style={styles.boton}
          textStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
      </View>
    </TouchableOpacity>
  );

  // Función para manejar la acción de finalizar la compra
  const finalizarCompra = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=finishOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 1) {
        Alert.alert('Compra Finalizada', '¡Gracias por tu compra!');
        setCarrito([]);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un problema al finalizar el pedido');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar la compra');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={carrito}
        renderItem={renderOfertaItem}
        keyExtractor={(item, index) => item?.id_detalle_reserva?.toString() ?? index.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }
      />
      {carrito.length === 0 && (
        <Text style={styles.emptyCarritoText}>No hay productos en el carrito.</Text>
      )}
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: ${subtotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.finalizarCompraButton} onPress={finalizarCompra}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Finalizar compra</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
    </View>
  );
};

export default CarritoScreen;
