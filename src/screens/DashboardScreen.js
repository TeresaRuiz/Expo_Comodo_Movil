import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, Alert, AppState, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../estilos/DashboardScreenStyles'; // Importa los estilos para el Dashboard
import LogOut from '../componets/Buttons/LogOut'; // Importa el componente de cerrar sesión
import Button from '../componets/Buttons/Button';  // Importa el componente de botón personalizado
import * as Constantes from '../utils/constantes'; // Importa las constantes, como la IP
import { useInactividadSesion } from '../componets/Hooks/inactividad.js'; // Hook para manejar inactividad de sesión

const DashboardScreen = ({ navigation }) => {
  const ip = Constantes.IP; // Obtiene la IP desde las constantes
  const { panHandlers, handleLogout } = useInactividadSesion(); // Hook para manejar inactividad y logout
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para el índice de la imagen actual
  const appState = useRef(AppState.currentState); // Referencia al estado de la aplicación

   // Array de imágenes para el banner
  const images = [
    'https://eldinero.com.do/wp-content/uploads/calzado-deportivo-adidas.jpg',
    'https://media.gq.com.mx/photos/5df2c28cf428fa0008c870a5/master/w_7184,c_limit/los-10-mejores-tenis-en-amazon-para-empezar-el-2020.jpg',
    'https://img.freepik.com/fotos-premium/par-zapatillas-deportivas-adidas-iluminan-habitacion-oscura_853645-10469.jpg',
    'https://www.experimenta.es/wp-content/uploads/2016/12/zapatillas-biodegradables-de-fibra-de-seda-de-arana-artificial-de-adidas-800x599.jpg',
  ];

    // Array de categorías para el Dashboard
  const categories = [
    { title: 'Categorías', icon: 'grid-outline', screen: 'Categorias' }, // Navega a la pantalla de categorías
    { title: 'Ofertas', icon: 'gift-outline', screen: 'Ofertas' }, // Navega a la pantalla de ofertas
    { title: 'Historial', icon: 'time-outline', screen: 'Historial' } // Navega a la pantalla de historial
  ];

  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Confirmar salida",
          "¿Está seguro que desea salir de la aplicación?", // Mensaje de confirmación
          [
            { text: "Cancelar", onPress: () => null, style: "cancel" }, // Opción de cancelar
            { text: "Sí", onPress: () => BackHandler.exitApp() } // Opción de salir
          ] 
        );
        return true; // Prevenir la acción de retroceso predeterminada
      };

      BackHandler.addEventListener('Login', onBackPress); // Escucha el evento de retroceso

      return () => BackHandler.removeEventListener('Login', onBackPress); // Limpia el evento al desmontar
    }, [])
  );

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
            onPress={() => navigation.navigate(category.screen)} // Navega a la pantalla correspondiente
            style={styles.card}
            textStyle={styles.cardTitle} // Estilo del texto del botón
            icon={<Ionicons name={category.icon} size={40} color="#000" />} // Ícono del botón
          />
        ))}
      </View>
      <LogOut
        title="" // Título del botón de cerrar sesión
        onPress={handleLogout} // Función para manejar el cierre de sesión
        style={styles.logoutButton} // Estilo del botón de cerrar sesión
        textStyle={{ color: '#7f7f7f' }} // Estilo del texto del botón
        icon={<Ionicons name="log-out-outline" size={24} color="black" />}  // Ícono del botón de cerrar sesión
      />
    </ScrollView>
  );
};

export default DashboardScreen; // Exporta el componente