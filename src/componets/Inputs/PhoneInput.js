import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'; // Asegúrate de importar TextInputMask

// Componente PhoneInput que recibe un valor y una función para cambiar el texto
const PhoneInput = ({ value, onChangeText }) => (
  <TextInputMask
    style={styles.input} // Aplicando estilos definidos en el objeto styles
    type={'custom'} // Tipo de entrada personalizada para el formato de teléfono
    options={{
      mask: '9999-9999' // Definición de la máscara para el formato de teléfono
    }}
    placeholder="Teléfono" // Texto que se muestra cuando no hay valor
    onChangeText={onChangeText} // Callback que se llama al cambiar el texto
    value={value} // Valor actual del input
    keyboardType="phone-pad" // Tipo de teclado para ingresar números de teléfono
  />
);

// Estilos para el componente PhoneInput
const styles = StyleSheet.create({
  input: {
    width: '75%', // Ancho del input, ocupa el 75% del contenedor
    backgroundColor: '#f0f0f0', // Color de fondo gris claro
    height: 50, // Altura del input
    borderRadius: 10, // Bordes redondeados
    paddingHorizontal: 15, // Espaciado horizontal interno
    marginBottom: 15, // Espaciado inferior para separar de otros elementos
  },
});

export default PhoneInput; // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
