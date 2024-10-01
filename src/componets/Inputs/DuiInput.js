import React from 'react'; // Importa React para crear componentes
import { StyleSheet } from 'react-native'; // Importa StyleSheet para definir estilos

// Componente DuiInput que permite la entrada de un número de DUI
const DuiInput = ({ value, onChangeText }) => (
  <TextInputMask // Utiliza TextInputMask para aplicar la máscara al input
    style={styles.input} // Aplica los estilos definidos
    type={'custom'} // Especifica que es un tipo personalizado
    options={{
      mask: '99999999-9' // Define la máscara para el número de DUI
    }}
    placeholder="DUI" // Texto que se muestra cuando el input está vacío
    onChangeText={onChangeText} // Callback que se llama al cambiar el texto
    value={value} // Valor actual del input
  />
);

// Define los estilos para el componente
const styles = StyleSheet.create({
  input: {
    width: '75%', // Ancho del input, ocupa el 75% del contenedor
    backgroundColor: '#f0f0f0', // Color de fondo del input
    height: 50, // Altura del input
    borderRadius: 10, // Bordes redondeados
    paddingHorizontal: 15, // Espaciado interno horizontal
    marginBottom: 15, // Margen inferior para separación con otros elementos
  },
});

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default DuiInput;
