// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Button = ({ title, onPress, style, textStyle, icon }) => {
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
    padding: 20, // Espaciado interno del botón
    borderRadius: 10, // Bordes redondeados
    alignItems: 'center', // Alinea el contenido al centro horizontalmente
    justifyContent: 'center', // Centra el contenido verticalmente
    backgroundColor: '#F8F8F8', // Color de fondo del botón
    margin: 10, // Margen alrededor del botón
  },
  text: {
    color: '#000', // Color del texto
    fontSize: 18, // Tamaño de la fuente
    marginLeft: 10, // Margen izquierdo para separar el texto del ícono
  },
  content: {
    flexDirection: 'column', // Alinea los hijos en columna
    alignItems: 'center', // Alinea el contenido verticalmente al centro
  },
});

export default Button; // Exporta el componente