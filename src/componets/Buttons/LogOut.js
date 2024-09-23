// LogOut.js
import React from 'react'; // Importa React
import { TouchableOpacity, StyleSheet, View } from 'react-native'; // Importa componentes de React Native
import { Ionicons } from '@expo/vector-icons'; // Importa íconos de Ionicons

// Componente para el botón de cerrar sesión
const LogOut = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}> {/* Botón que ejecuta onPress al ser presionado */}
      <View style={styles.content}> {/* Contenedor para el ícono */}
        <Ionicons name="log-out-outline" size={30} color="#000" /> {/* Ícono de cerrar sesión */}
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
});

export default LogOut; // Exporta el componente
