import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import styles from '../estilos/CarritoScreenStyles';  // Importa los estilos desde un archivo externo
import Button2  from '../../componets/Button2'; //Aca se importa el componente del boton

const CarritoScreen = ({ navigation }) => {
  const [carrito, setCarrito] = useState([
    {
      id: '1',
      title: 'Tenis NIKE',
      image: 'https://originalselsalvador.com/wp-content/uploads/2024/01/calzado-blazer-mid-77-vintage-nw30B2-min.png',
      description: 'Cantidad',
      price: 49.95,
      quantity: 1,
    },
    {
      id: '2',
      title: 'Tenis NIKE',
      description: 'Cantidad',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/calzado-air-force-1-07-jBrhbr.png',
      price: 69.99,
      quantity: 1,
    },
    {
      id: '3',
      title: 'Tenis NIKE',
      description: 'Cantidad',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c20afd60-b230-4815-bfd2-6768c875f6cd/calzado-air-force-1-07-J7xw5P.png',
      price: 79.99,
      quantity: 1,
    },
    {
      id: '4',
      title: 'Tenis NIKE',
      description: 'Cantidad',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/022c7053-5c55-4bc4-8cdc-72c6e8f95a5e/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP.png',
      price: 99.99,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (item, type) => {
    const updatedCarrito = carrito.map(producto => {
      if (producto.id === item.id) {
        let newQuantity = producto.quantity;
        if (type === 'increase') {
          newQuantity++;
        } else if (type === 'decrease' && newQuantity > 1) {
          newQuantity--;
        }
        return { ...producto, quantity: newQuantity };
      }
      return producto;
    });
    setCarrito(updatedCarrito);
  };

  const handleBuy = (item) => {
    Alert.alert(
      'Compra realizada',
      `Has comprado ${item.title} (Cantidad: ${item.quantity}) por $${(item.price * item.quantity).toFixed(2)}`,
      [{ text: 'OK', onPress: () => console.log('Alerta cerrada') }]
    );
  };

  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={() => navigation.navigate('DetallesProducto', { producto: item })}
    >
      <Image source={{ uri: item.image }} style={styles.ofertaImage} />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.title}</Text>
        <Text style={styles.ofertaDescription}>{item.description}</Text>
        <View style={styles.ofertaPriceContainer}>
          <Text style={styles.ofertaPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item, 'decrease')}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item, 'increase')}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Button2
            title="Comprar"
            onPress={() => handleBuy(item)}
            style={styles.boton}
            textStyle={{ color: '#fff', fontWeight: 'bold' }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={carrito}
        renderItem={renderOfertaItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default CarritoScreen;
