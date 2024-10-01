import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Coloca la imagen y los detalles en una fila
    backgroundColor: '#fff', // Fondo blanco para la tarjeta
    borderRadius: 10, // Bordes redondeados para la tarjeta
    marginBottom: 10, // Espacio inferior entre tarjetas
    padding: 10, // Espaciado interno de la tarjeta
    shadowColor: '#000', // Color de sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 5, // Difuminado de la sombra
    elevation: 5, // Elevación para agregar sombra en Android
  },
  image: {
    width: 100, // Ancho de la imagen del producto
    height: 100, // Altura de la imagen del producto
    borderRadius: 10, // Bordes redondeados para la imagen
    marginRight: 10, // Espacio a la derecha de la imagen
  },
  details: {
    flex: 1, // Permite que los detalles ocupen el espacio restante
    justifyContent: 'center', // Centra verticalmente los detalles
  },
  title: {
    fontSize: 18, // Tamaño de la fuente para el título del producto
    fontWeight: 'bold', // Texto en negrita para destacar
    marginBottom: 5, // Margen inferior para separar del siguiente texto
    color: '#333', // Color gris oscuro para el título
  },
  description: {
    fontSize: 14, // Tamaño de la fuente para la descripción del producto
    color: '#666', // Color gris claro para la descripción
    marginBottom: 10, // Margen inferior para separar de otros elementos
  },
  footer: {
    flexDirection: 'row', // Coloca los elementos del pie de la tarjeta en una fila
    alignItems: 'center', // Centra verticalmente los elementos en el pie
    justifyContent: 'space-between', // Espaciado entre los elementos del pie
  },
  price: {
    fontSize: 14, // Tamaño de la fuente para el precio del producto
    fontWeight: 'bold', // Texto en negrita para resaltar el precio
    color: '#333', // Color gris oscuro para el precio
  },
  button: {
    backgroundColor: '#007BFF', // Fondo azul para el botón
    borderRadius: 5, // Bordes redondeados para el botón
    padding: 5, // Espaciado interno del botón
    alignItems: 'center', // Centra el texto horizontalmente dentro del botón
  },
  buttonText: {
    color: '#fff', // Texto blanco para el botón
    fontSize: 14, // Tamaño de la fuente para el texto del botón
    fontWeight: 'bold', // Texto en negrita para resaltar
  },
});

export default styles;
