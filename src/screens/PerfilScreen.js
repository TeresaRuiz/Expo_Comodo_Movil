import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Importa Ionicons desde Expo
import { FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome desde Expo
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde react-navigation
import styles from '../estilos/PerfilScreenStyles'; // Importa estilos desde un archivo externo
import * as Constantes from '../utils/constantes'; // Importa constantes, como la URL de la API

const PerfilScreen = () => {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation(); // Obtiene la navegación actual desde react-navigation

  // Función para obtener el perfil del usuario
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${Constantes.IP}/Expo_Comodo/api/services/public/cliente.php?action=readProfile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluye las cookies para la autenticación de la sesión
      });
      const data = await response.json();
      if (data.status === 1 && data.dataset) {
        setNombre(data.dataset.nombre);
      } else {
        console.error('Error al leer el perfil:', data.error);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  

  useEffect(() => {
    fetchProfile(); // Llama a la función para obtener el perfil del usuario cuando se monta el componente
  }, []);

  // Función para abrir enlace de Facebook
  const abrirFacebook = () => {
    Linking.openURL('https://www.facebook.com/share/14Aeusm5Yt/');
  };
  // Función para abrir enlace de Facebook
  const abrirIg = () => {
    Linking.openURL('https://www.instagram.com/comodos.sv?igsh=MXZieG5lMnd5Mm5uNQ==');
  };
   // Función para abrir enlace de Facebook
   const abrirWhatsapp = () => {
    Linking.openURL('https://api.whatsapp.com/send/?phone=50379513264&text&type=phone_number&app_absent=0');
  };



  // Función para navegar a la pantalla 'MiPerfil'
  const handleMiPerfilPress = () => {
    navigation.navigate('MiPerfil');
  };

  // Función para navegar a la pantalla 'TerminosyCondiciones'
  const handleTerminosCondicionesPress = () => {
    navigation.navigate('TerminosyCondiciones');
  };

  // Función para manejar el refresco manual
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/c7/f9/fe/c7f9fe2e978b08473031c87f6fe657c2.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{nombre}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={handleMiPerfilPress}>
          <MenuItem title="Mi perfil" icon="person-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTerminosCondicionesPress}>
          <MenuItem title="Terminos y condiciones" icon="document-text-outline" />
        </TouchableOpacity>
      </View>

      <View style={styles.socialContainer}>
        <Text style={styles.socialTitle}>Nuestras redes sociales</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={abrirFacebook}>
            <FontAwesome name="facebook" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={abrirIg}>
            <FontAwesome name="instagram" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={abrirWhatsapp}>
            <FontAwesome name="whatsapp" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ title, icon }) => (
  <View style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#000" />
    <Text style={styles.menuItemText}>{title}</Text>
  </View>
);

export default PerfilScreen;
