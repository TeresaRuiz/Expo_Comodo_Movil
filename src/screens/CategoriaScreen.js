import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoriaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      {/* Aquí puedes añadir más componentes y lógica relacionados con las categorías */}
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
  },
});

export default CategoriaScreen;
