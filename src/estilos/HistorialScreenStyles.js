import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1, // Ocupa todo el espacio disponible
      backgroundColor: '#f5f5f5', // Color de fondo del contenedor
      marginTop: 10, // Ajusta el margen superior para mover todo hacia abajo
    },
    backButton: {
      alignSelf: 'flex-start', // Alinea el botón hacia la izquierda
      marginBottom: 10, // Margen inferior para separar del contenido siguiente
      marginTop: 10, // Margen superior para separar del borde superior
      left: 20, // Desplaza el botón hacia la izquierda
    },
    title: {
      fontSize: 26, // Tamaño de fuente del título
      fontWeight: 'bold', // Estilo de fuente en negrita
      marginBottom: 20, // Margen inferior para separar del contenido siguiente
      color: '#333', // Color del texto (gris oscuro)
      textAlign: 'center', // Centra el texto horizontalmente
      marginTop: 10, // Margen superior para separar del borde superior
    },
    listContainer: {
      paddingHorizontal: 10, // Espaciado horizontal interno
    },
    nombre_producto: {
      fontSize: 26, // Tamaño de fuente del nombre del producto
      fontWeight: 'bold', // Estilo de fuente en negrita
      marginBottom: 20, // Reduce el margen inferior
      color: '#333', // Color del texto (gris oscuro)
      textAlign: 'center', // Centra el texto horizontalmente
      marginTop: 40, // Reduce el margen superior para mover el título más arriba
    },
    ofertaCard: {
      flexDirection: 'row', // Disposición horizontal de los elementos dentro de la tarjeta
      borderRadius: 10, // Esquinas redondeadas de la tarjeta
      marginBottom: 10, // Reduce el margen inferior para menos separación entre tarjetas
      padding: 10, // Espaciado interno de la tarjeta
    },
    ofertaImage: {
      width: 100, // Ancho de la imagen de la oferta
      height: 100, // Alto de la imagen de la oferta
      borderRadius: 50, // Esquinas redondeadas para hacer la imagen circular
      marginRight: 10, // Margen derecho para separar de los detalles de la oferta
    },
    ofertaDetails: {
      flex: 1, // Permite que el contenedor ocupe el espacio restante
      justifyContent: 'center', // Centra los detalles de la oferta verticalmente
    },
    ofertaTitle: {
      fontSize: 18, // Tamaño de fuente del título de la oferta
      fontWeight: 'bold', // Estilo de fuente en negrita
      marginBottom: 5, // Margen inferior para separar del siguiente texto
      color: '#333', // Color del texto (gris oscuro)
    },
    ofertaDescription: {
      fontSize: 14, // Tamaño de fuente de la descripción de la oferta
      color: '#666', // Color del texto (gris)
      marginBottom: 10, // Margen inferior para separar del siguiente texto
    },
    fecha: {
      fontSize: 14, // Tamaño de fuente de la fecha
      color: '#666', // Color del texto (gris)
      marginBottom: 10, // Margen inferior para separar del siguiente texto
    },
    
    subTotal: {
      fontSize: 14, // Tamaño de fuente del subtotal
      color: '#666', // Color del texto (gris)
      marginBottom: 20, // Margen inferior para separar del siguiente elemento
    },
    ofertaPriceContainer: {
      flexDirection: 'row', // Disposición horizontal de los elementos en el contenedor de precios
      alignItems: 'center', // Centra los elementos verticalmente
    },
    ofertaPrice: {
      fontSize: 16, // Tamaño de fuente del precio de la oferta
      fontWeight: 'bold', // Estilo de fuente en negrita
      color: '#333', // Color del texto (gris oscuro)
    },
    discountBadge: {
      backgroundColor: '#3046BC', // Color de fondo del distintivo de descuento
      paddingVertical: 3, // Espaciado vertical interno del distintivo
      paddingHorizontal: 8, // Espaciado horizontal interno del distintivo
      borderRadius: 5, // Esquinas redondeadas del distintivo
      marginLeft: 10, // Margen izquierdo para separar del precio
    },
    discountText: {
      fontSize: 12, // Tamaño de fuente del texto de descuento
      color: '#fff', // Color del texto (blanco)
    },
});

export default styles;
