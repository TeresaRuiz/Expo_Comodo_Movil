import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
    justifyContent: 'flex-start', // Alinea los componentes hacia la parte superior
    alignItems: 'center', // Centra los componentes horizontalmente
    backgroundColor: '#f5f5f5', // Color de fondo del contenedor
    paddingVertical: 10, // Espaciado vertical para el contenedor
    paddingTop: 90, // Padding superior para dar espacio a otros elementos
  },
  banner: {
    width: '90%', // Ancho del banner en relación al contenedor
    height: 150, // Altura fija del banner
    borderRadius: 15, // Esquinas redondeadas del banner
    marginBottom: 20, // Espacio inferior entre el banner y el siguiente elemento
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 10, // Difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android
  },
  title: {
    fontSize: 26, // Tamaño de la fuente del título
    fontWeight: 'bold', // Estilo de la fuente del título
    marginBottom: 20, // Espacio inferior para separar del siguiente elemento
    color: '#333', // Color del texto del título
  },
  grid: {
    width: '100%', // Ancho completo del contenedor de la cuadrícula
    flexDirection: 'row', // Disposición en fila
    flexWrap: 'wrap', // Permite que los elementos se envuelvan a la siguiente línea
    justifyContent: 'space-around', // Espaciado entre los elementos
    alignItems: 'center', // Centra los elementos verticalmente
  },
  card: {
    width: '40%', // Ancho de cada tarjeta en relación al contenedor
    backgroundColor: '#fff', // Color de fondo de la tarjeta
    borderRadius: 15, // Esquinas redondeadas de la tarjeta
    padding: 20, // Espaciado interno de la tarjeta
    marginBottom: 20, // Espacio inferior entre tarjetas
    alignItems: 'center', // Centra los contenidos de la tarjeta
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 10, // Difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android
  },
  cardTitle: {
    fontSize: 18, // Tamaño de la fuente del título de la tarjeta
    fontWeight: 'bold', // Estilo de la fuente del título de la tarjeta
    marginTop: 10, // Espacio superior para separar del contenido
    textAlign: 'center', // Centra el texto del título
    color: '#333', // Color del texto del título de la tarjeta
  },
  logoutButton: {
    position: 'absolute', // Posiciona el botón de cerrar sesión de forma absoluta
    top: 20, // Distancia desde la parte superior
    right: 20, // Distancia desde el lado derecho
  },
});

export default styles;
