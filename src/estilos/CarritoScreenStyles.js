import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible en la pantalla
    backgroundColor: '#f5f5f5', // Color de fondo claro para el contenedor principal
  },
  listContainer: {
    paddingVertical: 20, // Espaciado vertical para el contenido de la lista
    paddingHorizontal: 10, // Espaciado horizontal para que los elementos no estén al borde
  },
  subtotalContainer: {
    padding: 16, // Espaciado interno para el contenedor del subtotal
    borderTopWidth: 1, // Borde superior para diferenciar del contenido anterior
    borderColor: '#ccc', // Color del borde superior
    backgroundColor: '#f9f9f9', // Fondo claro para el subtotal
  },
  subtotalText: {
    fontSize: 18, // Tamaño de fuente para el texto del subtotal
    fontWeight: 'bold', // Texto en negrita para resaltar
    textAlign: 'right', // Alineación del texto a la derecha
    marginTop: -50, // Ajuste para el margen superior
  },
  title: {
    fontSize: 24, // Tamaño de la fuente del título principal
    fontWeight: 'bold', // Negrita para resaltar el título
    marginBottom: 20, // Margen inferior para separar del siguiente elemento
    color: '#333', // Color gris oscuro para el título
    textAlign: 'center', // Alineación centrada para el título
    marginTop: 20, // Margen superior para dar espacio al título
  },
  ofertaCard: {
    flexDirection: 'row', // Coloca los elementos de la oferta en una fila
    backgroundColor: '#fff', // Fondo blanco para la tarjeta de la oferta
    borderRadius: 15, // Bordes redondeados
    marginBottom: 15, // Espacio inferior entre las tarjetas
    padding: 15, // Espaciado interno para la tarjeta
    shadowColor: '#000', // Sombra negra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 5, // Radio de difuminado de la sombra
    elevation: 5, // Elevación para agregar sombra en Android
  },
  ofertaImage: {
    width: 100, // Ancho de la imagen de la oferta
    height: 100, // Altura de la imagen de la oferta
    borderRadius: 10, // Bordes redondeados de la imagen
    marginRight: 15, // Margen derecho para separar la imagen del texto
  },
  ofertaDetails: {
    flex: 1, // Permite que los detalles de la oferta ocupen el espacio restante
    justifyContent: 'space-between', // Distribuye los elementos equitativamente
  },
  ofertaTitle: {
    fontSize: 16, // Tamaño de fuente para el título de la oferta
    fontWeight: 'bold', // Negrita para destacar el título
    marginBottom: 5, // Margen inferior para separar del siguiente texto
    color: '#333', // Color gris oscuro para el título
  },
  ofertaPrice: {
    fontSize: 14, // Tamaño de la fuente reducido para el precio
    padding: 3, // Espaciado interno
    fontWeight: 'bold', // Negrita para destacar el precio
    color: '#333', // Color gris oscuro
  },
  quantityContainer: {
    flexDirection: 'row', // Coloca los botones de cantidad en una fila
    alignItems: 'center', // Centra verticalmente los elementos en la fila
    justifyContent: 'space-between', // Espaciado entre los botones y la cantidad
  },
  quantityButton: {
    backgroundColor: '#3046BC', // Fondo azul para los botones de cantidad
    borderRadius: 5, // Bordes redondeados
    width: 30, // Ancho del botón de cantidad
    height: 30, // Altura del botón de cantidad
    alignItems: 'center', // Centra horizontalmente el texto dentro del botón
    justifyContent: 'center', // Centra verticalmente el texto dentro del botón
  },
  quantityButtonText: {
    color: '#fff', // Texto blanco
    fontWeight: 'bold', // Texto en negrita
    fontSize: 16, // Tamaño del texto
  },
  quantity: {
    fontSize: 16, // Tamaño del texto de la cantidad
    fontWeight: 'bold', // Texto en negrita
  },
  deleteButton: {
    backgroundColor: '#FF0000', // Fondo rojo para el botón de eliminar
    borderRadius: 10, // Bordes redondeados
    paddingVertical: 5, // Padding vertical
    paddingHorizontal: 10, // Padding horizontal
    alignItems: 'center', // Centra el contenido horizontalmente
    justifyContent: 'center', // Centra el contenido verticalmente
    marginLeft: 10, // Margen izquierdo para separar del resto de los botones
  },
  finalizarCompraButton: {
    backgroundColor: '#3046BC', // Fondo azul para el botón de finalizar compra
    borderRadius: 10, // Bordes redondeados
    paddingVertical: 10, // Espaciado vertical
    paddingHorizontal: 20, // Espaciado horizontal
    alignItems: 'center', // Centra el texto horizontalmente
    justifyContent: 'center', // Centra el texto verticalmente
    shadowColor: '#000', // Sombra negra
    shadowOffset: { width: 0, height: 3 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 5, // Difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android
    alignSelf: 'center', // Centra el botón en la pantalla
    width: 200, // Ancho del botón
    left: 95, // Ajusta la posición hacia la derecha
    marginVertical: 10, // Margen vertical
  },
  emptyCarritoContainer: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    marginVertical: 20, // Margen vertical para darle espacio
  },
  emptyCartImage: {
    width: 150, // Ancho de la imagen del carrito vacío
    height: 150, // Altura de la imagen del carrito vacío
    marginBottom: 10, // Espacio inferior debajo de la imagen
    marginTop: -350, // Ajusta la posición de la imagen hacia arriba
  },
  emptyCarritoText: {
    fontSize: 18, // Tamaño de la fuente del texto de carrito vacío
    color: '#333', // Color gris oscuro
    textAlign: 'center', // Centra el texto
    marginTop: 10, // Margen superior para separar del resto del contenido
  },
  loadingContainer: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  emptyCarritoText: {
    textAlign: 'center', // Alinea el texto en el centro
    marginTop: 10, // Margen superior
    fontSize: 18, // Tamaño de la fuente del texto de carrito vacío
    color: '#666', // Color gris claro
  },
});

export default styles;
