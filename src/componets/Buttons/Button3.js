import React from 'react'; // Importa React
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'; // Importa componentes de React Native

// Componente de botón personalizado
const Button3 = ({ onPress, children, style }) => {
  return (
    <View style={styles.buttonContainer}> {/* Contenedor del botón */}
      <TouchableOpacity 
        style={[styles.button, style]} // Estilos del botón y estilos adicionales si se proporcionan
        onPress={onPress} // Función a ejecutar al presionar el botón
      >
        <Text style={styles.buttonText}>{children}</Text> {/* Texto del botón */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%', // Ancho completo del contenedor
    alignItems: 'center', // Alinea el botón al centro
    marginVertical: 10, // Margen vertical alrededor del contenedor
  },
  button: {
    backgroundColor: '#007bff', // Color de fondo del botón
    paddingVertical: 15, // Espaciado vertical interno
    paddingHorizontal: 20, // Espaciado horizontal interno
    borderRadius: 5, // Bordes redondeados
    alignItems: 'center', // Alinea el contenido al centro
    justifyContent: 'center', // Centra el contenido
    width: '70%', // Ancho del botón
    maxWidth: 400, // Ancho máximo del botón
  },
  buttonText: {
    color: '#fff', // Color del texto
    fontSize: 16, // Tamaño de la fuente
    fontWeight: 'bold', // Peso de la fuente
  },
});

export default Button3; // Exporta el componente
