import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 10, // Ocupa más espacio disponible en la pantalla
    backgroundColor: '#fff', // Fondo blanco para el contenedor principal
  },
  scrollContainer: {
    padding: 60, // Añade un margen interno de 60 unidades alrededor del contenido desplazable
  },

  title: {
    fontSize: 24, // Tamaño de fuente grande para el título
    fontWeight: 'bold', // Estilo de fuente en negrita
    marginBottom: 20, // Margen inferior para separar el título de los siguientes elementos
  },
  subtitle: {
    fontSize: 20, // Tamaño de fuente ligeramente más pequeño para el subtítulo
    fontWeight: 'bold', // Negrita para el subtítulo
    marginBottom: 10, // Espacio inferior para separar el subtítulo del siguiente contenido
    marginTop: 20, // Espacio superior para separar el subtítulo de los elementos anteriores
    color: '#333', // Color de texto gris oscuro
  },
  text: {
    fontSize: 16, // Tamaño de fuente estándar para el texto general
    color: '#333', // Color de texto gris oscuro
    lineHeight: 24, // Altura de línea para mejorar la legibilidad
  },

  backButton: {
    position: 'absolute', // Coloca el botón en una posición específica
    top: 50, // A 50 unidades desde la parte superior de la pantalla
    left: 25, // A 25 unidades desde el borde izquierdo de la pantalla
    zIndex: 1, // Asegura que el botón esté sobre otros elementos de la interfaz
  },
});

export default styles;
