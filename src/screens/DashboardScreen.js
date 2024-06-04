import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar la sesión del usuario
    // Por ejemplo, puedes borrar el token de autenticación o limpiar el estado de la sesión
    // Luego, navega de vuelta a la pantalla de inicio de sesión
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card 1</Text>
        <Text style={styles.cardContent}>Content of Card 1</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card 2</Text>
        <Text style={styles.cardContent}>Content of Card 2</Text>
      </View>
      {/* Agrega más tarjetas o componentes del dashboard aquí */}
      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={[styles.logoutButton, { top: 40 }]} onPress={handleLogout}>
  <Ionicons name="lock-closed" size={24} color="black" />
</TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default DashboardScreen;
