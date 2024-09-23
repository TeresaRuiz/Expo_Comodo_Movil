// Button.js
import React from 'react'; // Importa React
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'; // Importa componentes de React Native

// Componente de botón personalizado que acepta un título, función onPress, estilos y un ícono opcional
const Button = ({ title, onPress, style, textStyle, icon }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} // Estilo del botón, incluyendo estilos adicionales si se proporcionan
      onPress={onPress} // Función a ejecutar al presionar el botón
    >
      <View style={styles.content}> {/* Contenedor para el contenido del botón */}
        {icon} {/* Renderiza el ícono si se proporciona */}
        <Text style={[styles.text, textStyle]}>{title}</Text> {/* Texto del botón con estilos personalizados */}
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
