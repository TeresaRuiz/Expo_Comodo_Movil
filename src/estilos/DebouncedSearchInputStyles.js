import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    addressInput: {
      flex: 1, // Permite que el campo de entrada ocupe todo el espacio disponible en su contenedor
      backgroundColor: '#f0f0f0', // Color de fondo del campo de entrada
      height: 50, // Altura fija del campo de entrada
      borderRadius: 10, // Esquinas redondeadas del campo de entrada
      paddingHorizontal: 15, // Espaciado interno horizontal para el texto
      marginRight: 10, // Margen derecho para separar del siguiente elemento
    },
});

export default styles;
