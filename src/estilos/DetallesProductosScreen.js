import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenedor crezca para llenar el espacio disponible
    padding: 10, // Espaciado interno alrededor del contenedor
    backgroundColor: '#F8F9FA', // Color de fondo del contenedor
  },
  backButton: {
    alignSelf: 'flex-start', // Alinea el botón hacia la izquierda
    marginTop: 20, // Margen superior para separar del borde superior
    marginBottom: 20, // Margen inferior para separar del contenido siguiente
  },
  image: {
    width: '100%', // Ancho de la imagen ocupa todo el ancho del contenedor
    height: 300, // Altura fija de la imagen
    borderRadius: 20, // Esquinas redondeadas de la imagen
    marginBottom: 20, // Margen inferior para separar de los siguientes elementos
    resizeMode: 'cover', // Asegura que la imagen cubra todo el espacio asignado
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 10, // Difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android
  },
  title: {
    fontSize: 28, // Tamaño de fuente del título
    fontWeight: 'bold', // Estilo de fuente en negrita
    marginBottom: 10, // Margen inferior para separar del contenido siguiente
    textAlign: 'center', // Centra el texto horizontalmente
    color: '#333', // Color del texto (gris oscuro)
  },
  description: {
    fontSize: 16, // Tamaño de fuente de la descripción
    marginBottom: 20, // Margen inferior para separar del siguiente elemento
    textAlign: 'center', // Centra el texto horizontalmente
    color: '#666', // Color del texto (gris)
  },
  detailsContainer: {
    backgroundColor: '#fff', // Color de fondo del contenedor de detalles
    borderRadius: 10, // Esquinas redondeadas del contenedor
    padding: 20, // Espaciado interno del contenedor
    marginBottom: 20, // Margen inferior para separar del siguiente elemento
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 6, // Difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android
  },
  detailsRow: {
    flexDirection: 'row', // Disposición horizontal de los elementos en la fila
    justifyContent: 'space-between', // Espaciado entre los elementos de la fila
    marginBottom: 10, // Margen inferior para separar de la siguiente fila
  },
  detailsLabel: {
    fontSize: 16, // Tamaño de fuente de la etiqueta de detalles
    color: '#666', // Color del texto (gris)
  },
  detailsValue: {
    fontSize: 16, // Tamaño de fuente del valor de detalles
    fontWeight: 'bold', // Estilo de fuente en negrita
    color: '#333', // Color del texto (gris oscuro)
  },
  addButton: {
    backgroundColor: '#3046BC', // Color de fondo del botón de añadir
    borderRadius: 10, // Esquinas redondeadas del botón
    paddingVertical: 15, // Espaciado vertical interno del botón
    paddingHorizontal: 30, // Espaciado horizontal interno del botón
    alignItems: 'center', // Centra el texto dentro del botón
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 3 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 5, // Difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Color de fondo del botón deshabilitado
    shadowOpacity: 0.1, // Opacidad de la sombra reducida
  },
  addButtonText: {
    fontSize: 18, // Tamaño de fuente del texto del botón
    fontWeight: 'bold', // Estilo de fuente en negrita
    color: '#fff', // Color del texto (blanco)
  },
  pricingInfoContainer: {
    backgroundColor: '#F1F1F1', // Color de fondo del contenedor de información de precios
    borderRadius: 10, // Esquinas redondeadas del contenedor
    padding: 20, // Espaciado interno del contenedor
    marginBottom: 20, // Margen inferior para separar del siguiente elemento
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 3 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 5, // Difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android
  },
  pricingInfoRow: {
    flexDirection: 'row', // Disposición horizontal de los elementos en la fila de precios
    justifyContent: 'space-between', // Espaciado entre los elementos de la fila
    marginBottom: 10, // Margen inferior para separar de la siguiente fila
  },
  pricingInfoLabel: {
    fontSize: 16, // Tamaño de fuente de la etiqueta de información de precios
    color: '#666', // Color del texto (gris)
  },
  pricingInfoValue: {
    fontSize: 16, // Tamaño de fuente del valor de información de precios
    fontWeight: 'bold', // Estilo de fuente en negrita
    color: '#333', // Color del texto (gris oscuro)
  },
  inputContainer: {
    marginTop: 10, // Margen superior para separar del contenido anterior
  },
  label: {
    fontSize: 16, // Tamaño de fuente de la etiqueta de entrada
    color: '#666', // Color del texto (gris)
    marginBottom: 5, // Margen inferior para separar de la entrada
  },
  input: {
    backgroundColor: '#FFF', // Color de fondo de la entrada
    borderRadius: 10, // Esquinas redondeadas de la entrada
    paddingVertical: 10, // Espaciado vertical interno de la entrada
    paddingHorizontal: 15, // Espaciado horizontal interno de la entrada
    fontSize: 16, // Tamaño de fuente de la entrada
    color: '#333', // Color del texto (gris oscuro)
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 4, // Difuminado de la sombra
    elevation: 3, // Elevación para dispositivos Android
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorCircle: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  checkmarkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 2,
  },

  // Estilos para las tallas
  tallasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tallaButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  selectedTallaButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tallaText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTallaText: {
    color: '#fff',
  },

  // Estilos para los títulos de sección
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },

  // Actualizar estilos existentes si es necesario
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 15,
  },
});

export default styles;
