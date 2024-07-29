import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/DashboardScreenStyles';
import LogOut from '../componets/LogOut';
import Button from '../componets/Buttons/Button';
import * as Constantes from '../utils/constantes';

const DashboardScreen = ({ navigation }) => {
  const ip = Constantes.IP;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logOut`;
      console.log('URL solicitada:', url);

      const response = await fetch(url, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.status) {
        navigation.navigate('Login', { clearLoginData: true });
        Alert.alert('Sesión cerrada exitosamente');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  const categories = [
    { title: 'Categorías', icon: 'grid-outline', screen: 'Categorias' },
    { title: 'Ofertas', icon: 'gift-outline', screen: 'Ofertas' },
    { title: 'Historial', icon: 'time-outline', screen: 'Historial' }
  ];

  const images = [
    'https://eldinero.com.do/wp-content/uploads/calzado-deportivo-adidas.jpg',
    'https://media.gq.com.mx/photos/5df2c28cf428fa0008c870a5/master/w_7184,c_limit/los-10-mejores-tenis-en-amazon-para-empezar-el-2020.jpg',
    'https://img.freepik.com/fotos-premium/par-zapatillas-deportivas-adidas-iluminan-habitacion-oscura_853645-10469.jpg',
    'https://www.experimenta.es/wp-content/uploads/2016/12/zapatillas-biodegradables-de-fibra-de-seda-de-arana-artificial-de-adidas-800x599.jpg',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.banner}
      />
      <Text style={styles.title}>Dashboard</Text>
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
