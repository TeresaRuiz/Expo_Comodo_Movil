import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MiPerfilScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.info}>Nombre de usuario aquí</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <Text style={styles.info}>Correo electrónico aquí</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.info}>Teléfono aquí</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    fontSize: 18,
  },
});

export default MiPerfilScreen;
