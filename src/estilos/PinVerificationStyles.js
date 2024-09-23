import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1, // Ocupa todo el espacio disponible del contenedor padre
      justifyContent: 'center', // Centra los elementos verticalmente
      alignItems: 'center', // Centra los elementos horizontalmente
      backgroundColor: '#fff', // Color de fondo del contenedor
      paddingHorizontal: 20, // Espaciado horizontal en los lados
    },
    title: {
      fontSize: 24, // Tamaño de fuente del título
      fontWeight: 'bold', // Estilo de fuente en negrita
      marginBottom: 10, // Margen inferior para separar del siguiente elemento
    },
    logo: {
      width: 250, // Ancho de la imagen del logo
      height: 235, // Alto de la imagen del logo
      marginBottom: 30, // Margen inferior para separar del siguiente elemento
    },
    input: {
      width: '80%', // Ancho del campo de entrada (80% del contenedor)
      backgroundColor: '#f0f0f0', // Color de fondo del campo de entrada
      height: 50, // Alto del campo de entrada
      borderRadius: 10, // Esquinas redondeadas del campo de entrada
      paddingHorizontal: 15, // Espaciado horizontal interno
      marginBottom: 15, // Margen inferior para separar del siguiente elemento
    },
    passwordContainer: {
      width: '80%', // Ancho del contenedor de la contraseña (80% del contenedor)
      flexDirection: 'row', // Disposición horizontal de los elementos dentro del contenedor
      alignItems: 'center', // Centra los elementos hijos verticalmente
      backgroundColor: '#f0f0f0', // Color de fondo del contenedor de contraseña
      height: 50, // Alto del contenedor de contraseña
      borderRadius: 10, // Esquinas redondeadas del contenedor
      paddingHorizontal: 15, // Espaciado horizontal interno
      marginBottom: 15, // Margen inferior para separar del siguiente elemento
    },
    eyeIcon: {
      position: 'absolute', // Posiciona el ícono de ojo de manera absoluta dentro del contenedor
      right: 15, // Desplazamiento a la derecha
    },
    button: {
      backgroundColor: '#3046BC', // Color de fondo del botón
      paddingHorizontal: 20, // Espaciado horizontal interno del botón
      paddingVertical: 10, // Espaciado vertical interno del botón
      borderRadius: 10, // Esquinas redondeadas del botón
      marginBottom: 10, // Margen inferior para separar del siguiente elemento
    },
    buttonText: {
      color: 'white', // Color del texto del botón
      fontSize: 15, // Tamaño de fuente del texto del botón
      fontWeight: 'bold', // Estilo de fuente en negrita
    },
    link: {
      color: '#007bff', // Color del texto del enlace
      fontSize: 16, // Tamaño de fuente del enlace
    },
});

export default styles;
