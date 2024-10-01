import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Permite que el contenedor ocupe todo el espacio disponible
    justifyContent: 'center', // Centra los elementos hijos verticalmente
    alignItems: 'center', // Centra los elementos hijos horizontalmente
    backgroundColor: '#fff', // Color de fondo blanco
    paddingHorizontal: 20, // Espaciado horizontal dentro del contenedor
  },
  title: {
    fontSize: 24, // Tamaño de fuente del título
    fontWeight: 'bold', // Estilo de fuente en negrita
    marginBottom: 10, // Margen inferior para separar del siguiente elemento
  },
  logo: {
    width: 250, // Ancho de la imagen del logo
    height: 235, // Alto de la imagen del logo
    marginBottom: 20, // Margen inferior para separar del siguiente elemento
  },
  input: {
    width: '80%', // Ancho del campo de entrada (80% del contenedor)
    backgroundColor: '#f0f0f0', // Color de fondo del campo de entrada
    height: 50, // Alto del campo de entrada
    borderRadius: 10, // Esquinas redondeadas
    paddingHorizontal: 15, // Espaciado horizontal interno
    marginBottom: 15, // Margen inferior para separar del siguiente elemento
  },
  passwordContainer: {
    width: '80%', // Ancho del contenedor de la contraseña
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
  button: {
    backgroundColor: '#3046BC', // Color de fondo del botón
    paddingHorizontal: 20, // Espaciado horizontal interno
    paddingVertical: 10, // Espaciado vertical interno
    borderRadius: 10, // Esquinas redondeadas
    marginBottom: 10, // Margen inferior para separar del siguiente elemento
  },
  buttonText: {
    color: 'white', // Color del texto del botón
    fontSize: 15, // Tamaño de fuente del texto del botón
    fontWeight: 'bold', // Estilo de fuente en negrita
  },
  link: {
    color: '#007bff', // Color del texto del enlace
    fontSize: 16, // Tamaño de fuente del texto del enlace
  },
});

export default styles;
