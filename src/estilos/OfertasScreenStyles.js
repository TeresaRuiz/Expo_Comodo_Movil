import { StyleSheet } from 'react-native'; // Importa el módulo StyleSheet desde React Native para crear estilos.

const styles = StyleSheet.create({ // Crea un objeto de estilos utilizando StyleSheet.
  container: { // Estilo para el contenedor principal.
    flex: 1, // Permite que el contenedor ocupe todo el espacio disponible.
    backgroundColor: '#f5f5f5', // Establece un color de fondo claro.
  },
  promoImage: { // Estilo para la imagen promocional.
    width: '100%', // La imagen ocupa el 100% del ancho del contenedor.
    height: 200, // Altura fija de 200 píxeles.
    resizeMode: 'cover', // Ajusta la imagen para cubrir el área sin distorsionarla.
    marginBottom: 20, // Añade un margen inferior para dar espacio entre elementos.
  },
  searchContainer: { // Estilo para el contenedor de búsqueda.
    flexDirection: 'row', // Organiza los elementos en una fila.
    alignItems: 'center', // Alinea verticalmente los elementos al centro.
    backgroundColor: '#fff', // Color de fondo blanco.
    borderRadius: 30, // Bordes redondeados con un radio de 30 píxeles.
    paddingHorizontal: 20, // Espaciado horizontal interno de 20 píxeles.
    paddingVertical: 10, // Espaciado vertical interno de 10 píxeles.
    marginBottom: 20, // Margen inferior para separar de otros elementos.
    shadowColor: '#000', // Color de la sombra.
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra.
    shadowOpacity: 0.1, // Opacidad de la sombra.
    shadowRadius: 6, // Radio de difuminado de la sombra.
    elevation: 8, // Elevación para Android, que crea una sombra.
  },
  searchIcon: { // Estilo para el icono de búsqueda.
    marginRight: 15, // Margen derecho para separar del input.
  },
  searchInput: { // Estilo para el campo de entrada de búsqueda.
    flex: 1, // Permite que el input ocupe el espacio restante en el contenedor.
    height: 40, // Altura fija de 40 píxeles.
    fontSize: 18, // Tamaño de fuente de 18 píxeles.
    color: '#333', // Color del texto en un tono gris oscuro.
  },
  listContainer: { // Estilo para el contenedor de la lista de ofertas.
    paddingBottom: 20, // Espaciado inferior para dar espacio al final de la lista.
  },
  ofertaCard: { // Estilo para cada tarjeta de oferta.
    flexDirection: 'row', // Organiza los elementos de la tarjeta en una fila.
    padding: 10, // Espaciado interno de 10 píxeles.
    borderBottomWidth: 1, // Ancho del borde inferior de la tarjeta.
    borderBottomColor: '#ddd', // Color del borde inferior en gris claro.
    backgroundColor: '#fff', // Color de fondo blanco.
    borderRadius: 10, // Bordes redondeados con un radio de 10 píxeles.
    margin: 10, // Margen alrededor de la tarjeta.
    elevation: 2, // Elevación para Android, que crea una sombra leve.
    shadowColor: '#000', // Color de la sombra.
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra.
    shadowOpacity: 0.8, // Opacidad de la sombra.
    shadowRadius: 2, // Radio de difuminado de la sombra.
  },
  ofertaImage: { // Estilo para la imagen de la oferta.
    width: 80, // Ancho fijo de 80 píxeles.
    height: 80, // Altura fija de 80 píxeles.
    borderRadius: 5, // Bordes redondeados con un radio de 5 píxeles.
    marginRight: 10, // Margen derecho para separar de los detalles.
  },
  ofertaDetails: { // Estilo para los detalles de la oferta.
    flex: 1, // Permite que el contenedor de detalles ocupe el espacio restante.
    justifyContent: 'center', // Centra los elementos verticalmente.
    marginLeft: 10, // Margen izquierdo para separar de la imagen.
  },
  ofertaTitle: { // Estilo para el título de la oferta.
    fontSize: 16, // Tamaño de fuente de 16 píxeles.
    fontWeight: 'bold', // Texto en negrita.
    color: '#333', // Color del texto en un tono gris oscuro.
  },
  ofertaDescription: { // Estilo para la descripción de la oferta.
    fontSize: 14, // Tamaño de fuente de 14 píxeles.
    color: '#666', // Color del texto en un tono gris más claro.
  },
  ofertaPriceContainer: { // Estilo para el contenedor del precio de la oferta.
    flexDirection: 'row', // Organiza los elementos en una fila.
    alignItems: 'center', // Alinea verticalmente los elementos al centro.
    marginTop: 5, // Margen superior para separar de la descripción.
  },
  ofertaPrice: { // Estilo para el precio de la oferta.
    fontSize: 16, // Tamaño de fuente de 16 píxeles.
    fontWeight: 'bold', // Texto en negrita.
    color: '#3046BC', // Color del texto en un tono azul oscuro.
  },
  discountBadge: { // Estilo para la insignia de descuento.
    backgroundColor: '#3046BC', // Color de fondo de la insignia.
    borderRadius: 5, // Bordes redondeados con un radio de 5 píxeles.
    padding: 3, // Espaciado interno de 3 píxeles.
    marginLeft: 10, // Margen izquierdo para separar del precio.
  },
  discountText: { // Estilo para el texto del descuento.
    color: '#F0F8FF', // Color del texto en un tono claro.
    fontSize: 12, // Tamaño de fuente de 12 píxeles.
    marginLeft: 25, // Margen izquierdo para separar de la insignia.
    borderWidth: 1, // Ancho del borde.
    borderColor: '#3046BC', // Color del borde que coincide con la insignia.
    borderRadius: 5, // Bordes redondeados con un radio de 5 píxeles.
    padding: 2, // Espaciado interno de 2 píxeles.
    backgroundColor: '#3046BC', // Color de fondo que coincide con la insignia.
  },
  noOfertasText: { // Estilo para el texto que indica que no hay ofertas.
    textAlign: 'center', // Centra el texto horizontalmente.
    fontSize: 18, // Tamaño de fuente de 18 píxeles.
    color: '#3046BC', // Color del texto en un tono azul oscuro.
    marginTop: 20, // Margen superior para separar de otros elementos.
  },
});

export default styles; // Exporta el objeto de estilos para ser utilizado en otros componentes.