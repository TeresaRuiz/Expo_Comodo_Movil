import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenedor crezca según su contenido
    justifyContent: 'center', // Centra los elementos hijos verticalmente
    alignItems: 'center', // Centra los elementos hijos horizontalmente
    backgroundColor: '#fff', // Color de fondo blanco
    paddingVertical: 70, // Espaciado vertical dentro del contenedor
  },
  titleContainer: {
    alignItems: 'center', // Centra los elementos hijos dentro del contenedor
    marginBottom: 20, // Margen inferior para separar del siguiente elemento
  },
  logo: {
    width: 250, // Ancho de la imagen del logo
    height: 200, // Alto de la imagen del logo
    marginBottom: 10, // Margen inferior para separar del siguiente elemento
  },
  title: {
    fontSize: 24, // Tamaño de fuente del título
    fontWeight: 'bold', // Estilo de fuente en negrita
  },
  input: {
    width: '75%', // Ancho del campo de entrada (75% del contenedor)
    backgroundColor: '#f0f0f0', // Color de fondo del campo de entrada
    height: 50, // Alto del campo de entrada
    borderRadius: 10, // Esquinas redondeadas
    paddingHorizontal: 15, // Espaciado horizontal interno
    marginBottom: 15, // Margen inferior para separar del siguiente elemento
  },
  passwordContainer: {
    width: '75%', // Ancho del contenedor de la contraseña
    flexDirection: 'row', // Disposición horizontal de los elementos hijos
    alignItems: 'center', // Centra los elementos hijos verticalmente
    backgroundColor: '#f0f0f0', // Color de fondo del contenedor
    height: 50, // Alto del contenedor de la contraseña
    borderRadius: 10, // Esquinas redondeadas
    paddingHorizontal: 15, // Espaciado horizontal interno
    marginBottom: 15, // Margen inferior para separar del siguiente elemento
  },
  eyeIcon: {
    position: 'absolute', // Posiciona el ícono de ojo de forma absoluta
    right: 15, // Alineación a la derecha dentro del contenedor
  },
  addressContainer: {
    width: '75%', // Ancho del contenedor de la dirección
    flexDirection: 'row', // Disposición horizontal de los elementos hijos
    alignItems: 'center', // Centra los elementos hijos verticalmente
    marginBottom: 15, // Margen inferior para separar del siguiente elemento
  },
  clearButton: {
    backgroundColor: '#d9534f', // Color de fondo del botón de limpiar
    borderRadius: 10, // Esquinas redondeadas
    paddingVertical: 10, // Espaciado vertical interno
    paddingHorizontal: 15, // Espaciado horizontal interno
    marginLeft: 10, // Margen izquierdo para separar del campo de entrada
  },
  clearButtonText: {
    color: '#fff', // Color del texto del botón
    fontWeight: 'bold', // Estilo de fuente en negrita
  },
  map: {
    width: '75%', // Ancho del mapa (75% del contenedor)
    height: 200, // Alto del mapa
    marginBottom: 15, // Margen inferior para separar del siguiente elemento
  },
  registerButton: {
    width: '75%', // Ancho del botón de registro
    backgroundColor: '#3046BC', // Color de fondo del botón
    borderRadius: 10, // Esquinas redondeadas
    paddingVertical: 15, // Espaciado vertical interno
    alignItems: 'center', // Centra el texto dentro del botón
    marginBottom: 15, // Margen inferior para separar del siguiente elemento
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 18, // Tamaño de fuente del texto del botón
    fontWeight: 'bold', // Estilo de fuente en negrita
  },
  loginRedirectText: {
    color: '#007bff', // Color del texto para redirigir al inicio de sesión
    marginTop: 10, // Margen superior para separar del elemento anterior
    fontSize: 16, // Tamaño de fuente del texto
  },
});

export default styles;
