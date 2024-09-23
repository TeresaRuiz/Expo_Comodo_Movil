import React from 'react'; // Importa React
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'; // Importa componentes de React Native

// Componente de botón personalizado que acepta un título, función onPress, estilos y un ícono opcional
const Button2 = ({ title, onPress, style, textStyle, icon }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} // Estilo del botón y estilos adicionales si se proporcionan
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
    backgroundColor: '#007BFF', // Color de fondo del botón
    padding: 10, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
    alignItems: 'center', // Alinea el contenido al centro
    justifyContent: 'center', // Centra el contenido
    flexDirection: 'row', // Alinea los hijos en fila
  },
  text: {
    color: '#FFFFFF', // Color del texto
    fontSize: 16, // Tamaño de la fuente
    marginLeft: 10, // Margen izquierdo para separar el texto del ícono
  },
  content: {
    flexDirection: 'row', // Alinea el contenido en fila
    alignItems: 'center', // Alinea el contenido verticalmente al centro
  },
});

export default Button2; // Exporta el componente
