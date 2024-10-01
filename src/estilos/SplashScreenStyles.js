import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible del contenedor padre
    justifyContent: 'center', // Centra los elementos hijos verticalmente
    alignItems: 'center', // Centra los elementos hijos horizontalmente
    backgroundColor: '#fffdff', // Color de fondo suave (blanco con un toque de rosa)
  },
  imageContainer: {
    width: 100, // Ancho del contenedor de la imagen
    height: 100, // Alto del contenedor de la imagen
    alignItems: 'center', // Centra la imagen horizontalmente dentro del contenedor
    justifyContent: 'center', // Centra la imagen verticalmente dentro del contenedor
  },
  image: {
    width: '100%', // La imagen ocupa todo el ancho del contenedor
    height: '100%', // La imagen ocupa todo el alto del contenedor
    resizeMode: 'cover', // Escala la imagen para cubrir el contenedor, manteniendo su proporción
  },
});

export default styles;
