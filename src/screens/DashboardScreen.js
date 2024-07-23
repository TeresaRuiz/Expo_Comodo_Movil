import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/DashboardScreenStyles'; // Importa los estilos desde un archivo externo
import LogOut from '../../componets/LogOut';
import Button  from '../../componets/Button'; //Aca se importa el componente del boton

const DashboardScreen = ({ navigation }) => {
  // Define los estados locales para la consulta de búsqueda y el índice de la imagen actual
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Utiliza useEffect para cambiar automáticamente la imagen del banner cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  // Función para manejar la acción de cierre de sesión
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Define las categorías con sus títulos e iconos correspondientes
  const categories = [
    { title: 'Categorías', icon: 'grid-outline', screen: 'Categorias' },
    { title: 'Productos', icon: 'pricetag-outline', screen: 'Producto' },
    { title: 'Ofertas', icon: 'gift-outline', screen: 'Ofertas' },
    { title: 'Historial', icon: 'time-outline', screen: 'Historial' }
  ];

  // Define las URLs de las imágenes del banner
  const images = [
    'https://eldinero.com.do/wp-content/uploads/calzado-deportivo-adidas.jpg',
    'https://media.gq.com.mx/photos/5df2c28cf428fa0008c870a5/master/w_7184,c_limit/los-10-mejores-tenis-en-amazon-para-empezar-el-2020.jpg',
    'https://img.freepik.com/fotos-premium/par-zapatillas-deportivas-adidas-iluminan-habitacion-oscura_853645-10469.jpg',
    'https://www.experimenta.es/wp-content/uploads/2016/12/zapatillas-biodegradables-de-fibra-de-seda-de-arana-artificial-de-adidas-800x599.jpg',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contenedor de búsqueda */}
     

      {/* Banner de imágenes */}
      <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.banner}
      />

      {/* Título del Dashboard */}
      <Text style={styles.title}>Dashboard</Text>

      {/* Grid de categorías */}
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <Button
            key={index}
            title={category.title}
            onPress={() => navigation.navigate(category.screen)}
            style={styles.card}
            textStyle={styles.cardTitle}
            icon={<Ionicons name={category.icon} size={40} color="#000" />}
          />
        ))}
      </View>

      {/* Botón de cierre de sesión */}
      <LogOut
        title="Cerrar Sesión"
        onPress={handleLogout}
        style={styles.logoutButton}
        textStyle={{ color: '#7f7f7f' }}
        icon={<Ionicons name="lock-closed" size={24} color="black" />}
      />
    </ScrollView>
  );
};

export default DashboardScreen;
