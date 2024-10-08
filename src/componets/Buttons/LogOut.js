// LogOut.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const LogOut = ({ title, onPress, style, textStyle, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <View style={styles.content}>
        {icon}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo completamente transparente
    padding: 12, // Espaciado interno
    borderRadius: 25, // Bordes redondeados
    alignItems: 'center', // Alinea los elementos al centro
    justifyContent: 'center', // Centra el contenido
    flexDirection: 'row', // Dispone el contenido en fila
    shadowColor: 'transparent', // Sin sombra
    elevation: 0, // Sin elevación
    margin: 10, // Margen alrededor del botón
  },
  content: {
    flexDirection: 'row', // Dispone el contenido en fila
    alignItems: 'center', // Alinea los elementos al centro
  },
  text: {
    marginLeft: 10, // Espacio entre el ícono y el texto
    fontSize: 16, // Tamaño del texto
    color: '#000', // Color del texto
  },
});

export default LogOut; // Exporta el componente