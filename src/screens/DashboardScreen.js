import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/DashboardScreenStyles'; // Importa los estilos desde un archivo externo
import LogOut from '../componets/LogOut'; // Importa el componente LogOut
import Button from '../componets/Buttons/Button'; // Importa el componente Button
import * as Constantes from '../utils/constantes'; // Importa las constantes

const DashboardScreen = ({ navigation }) => {
  const ip = Constantes.IP; // Obtiene la IP desde las constantes
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para manejar el índice de la imagen actual del banner

  // Efecto para cambiar automáticamente las imágenes del banner cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logOut`;
      console.log('URL solicitada:', url);

      const response = await fetch(url, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.status) {
        navigation.navigate('Login', { clearLoginData: true }); // Navega a la pantalla de login
        Alert.alert('Sesión cerrada exitosamente'); // Muestra un mensaje de éxito
      } else {
        Alert.alert('Error', data.error); // Muestra un mensaje de error si no se puede cerrar sesión
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión'); // Muestra un mensaje de error si ocurre una excepción
    }
  };

  // Definición de las categorías para la navegación
  const categories = [
    { title: 'Categorías', icon: 'grid-outline', screen: 'Categorias' },
    { title: 'Ofertas', icon: 'gift-outline', screen: 'Ofertas' },
    { title: 'Historial', icon: 'time-outline', screen: 'Historial' }
  ];

  // Lista de URLs de las imágenes para el banner
  const images = [
    'https://eldinero.com.do/wp-content/uploads/calzado-deportivo-adidas.jpg',
    'https://media.gq.com.mx/photos/5df2c28cf428fa0008c870a5/master/w_7184,c_limit/los-10-mejores-tenis-en-amazon-para-empezar-el-2020.jpg',
    'https://img.freepik.com/fotos-premium/par-zapatillas-deportivas-adidas-iluminan-habitacion-oscura_853645-10469.jpg',
    'https://www.experimenta.es/wp-content/uploads/2016/12/zapatillas-biodegradables-de-fibra-de-seda-de-arana-artificial-de-adidas-800x599.jpg',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: images[currentImageIndex] }} // Muestra la imagen actual del banner
        style={styles.banner}
      />
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <Button
            key={index}
            title={category.title}
            onPress={() => navigation.navigate(category.screen)} // Navega a la pantalla correspondiente al presionar el botón
            style={styles.card}
            textStyle={styles.cardTitle}
            icon={<Ionicons name={category.icon} size={40} color="#000" />} // Muestra el ícono correspondiente
          />
        ))}
      </View>
      <LogOut
        title="Cerrar Sesión"
        onPress={handleLogout} // Maneja el cierre de sesión al presionar el botón
        style={styles.logoutButton}
        textStyle={{ color: '#7f7f7f' }}
        icon={<Ionicons name="lock-closed" size={24} color="black" />} // Muestra el ícono de cierre de sesión
      />
    </ScrollView>
  );
};

export default DashboardScreen;
