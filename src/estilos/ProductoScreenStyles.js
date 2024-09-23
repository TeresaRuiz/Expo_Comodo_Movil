import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenedor crezca y ocupe espacio disponible
    backgroundColor: '#F8F9FB', // Color de fondo del contenedor
    paddingVertical: 35, // Espaciado vertical reducido
    paddingHorizontal: 15, // Espaciado horizontal en los lados
  },
  backButton: {
    alignSelf: 'flex-start', // Alinea el botón de retroceso al inicio (izquierda)
    marginBottom: 20, // Margen inferior para separar del siguiente elemento
    left: 10, // Desplazamiento a la izquierda
  },
  searchContainer: {
    flexDirection: 'row', // Disposición horizontal de los elementos dentro del contenedor de búsqueda
    alignItems: 'center', // Centra los elementos hijos verticalmente
    backgroundColor: '#fff', // Color de fondo del contenedor de búsqueda
    borderRadius: 30, // Esquinas redondeadas del contenedor
    paddingHorizontal: 20, // Espaciado horizontal interno
    paddingVertical: 10, // Espaciado vertical interno
    marginBottom: 50, // Margen inferior para separar del siguiente elemento
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 6, // Radio de la sombra
    elevation: 8, // Elevación para Android (sombra)
  },
  searchIcon: {
    marginRight: 15, // Margen a la derecha para separar del input
  },
  searchInput: {
    flex: 1, // Permite que el input ocupe todo el espacio disponible en el contenedor
    height: 40, // Alto del campo de entrada
    fontSize: 18, // Tamaño de fuente del texto en el campo de entrada
    color: '#333', // Color del texto en el campo de entrada
  },
  grid: {
    flexDirection: 'row', // Disposición horizontal de las tarjetas
    flexWrap: 'wrap', // Permite que las tarjetas se envuelvan en varias filas
    justifyContent: 'space-between', // Espacio uniforme entre las tarjetas
  },
  card: {
    width: '48%', // Ancho de cada tarjeta (48% del contenedor)
    backgroundColor: '#fff', // Color de fondo de la tarjeta
    borderRadius: 20, // Esquinas redondeadas de la tarjeta
    padding: 20, // Espaciado interno de la tarjeta
    marginBottom: 25, // Margen inferior para separar de la siguiente tarjeta
    alignItems: 'center', // Centra los elementos hijos horizontalmente
    shadowColor: '#000', // Color de la sombra de la tarjeta
    shadowOffset: { width: 0, height: 6 }, // Desplazamiento de la sombra de la tarjeta
    shadowOpacity: 0.1, // Opacidad de la sombra de la tarjeta
    shadowRadius: 10, // Radio de la sombra de la tarjeta
    elevation: 10, // Elevación para Android (sombra)
  },
  cardImage: {
    width: 120, // Ancho de la imagen dentro de la tarjeta
    height: 120, // Alto de la imagen dentro de la tarjeta
    borderRadius: 20, // Esquinas redondeadas de la imagen
    marginBottom: 15, // Margen inferior para separar de la descripción
  },
  cardTitle: {
    fontSize: 20, // Tamaño de fuente del título de la tarjeta
    fontWeight: 'bold', // Estilo de fuente en negrita
    textAlign: 'center', // Centra el texto del título
    marginBottom: 8, // Margen inferior para separar del texto de descripción
    color: '#333', // Color del texto del título
  },
  cardDescription: {
    fontSize: 16, // Tamaño de fuente de la descripción de la tarjeta
    color: '#555', // Color del texto de la descripción
    textAlign: 'center', // Centra el texto de la descripción
    marginBottom: 15, // Margen inferior para separar de otros elementos
  },
  button: {
    backgroundColor: '#283AE2', // Color de fondo del botón
    borderRadius: 15, // Esquinas redondeadas del botón
    paddingVertical: 10, // Espaciado vertical interno del botón
    paddingHorizontal: 25, // Espaciado horizontal interno del botón
    shadowColor: '#000', // Color de la sombra del botón
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra del botón
    shadowOpacity: 0.3, // Opacidad de la sombra del botón
    shadowRadius: 5, // Radio de la sombra del botón
    elevation: 8, // Elevación para Android (sombra)
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16, // Tamaño de fuente del texto del botón
    fontWeight: 'bold', // Estilo de fuente en negrita
    textAlign: 'center', // Centra el texto dentro del botón
    left: -4, // Desplazamiento a la izquierda del texto (opcional)
  },
});

export default styles;
