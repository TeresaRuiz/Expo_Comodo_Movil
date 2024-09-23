import React, { forwardRef } from 'react'; // Importa React y forwardRef para pasar la referencia
import { View, Text, TextInput } from 'react-native'; // Importa componentes básicos de React Native
import styles from '../../estilos/MiPerfilScreenStyles'; // Asegúrate de que esta ruta sea correcta para los estilos

// Componente InputMiPerfil que utiliza forwardRef para permitir el acceso a su referencia
const InputMiPerfil = forwardRef(({ label, value, onChangeText, editable }, ref) => (
  <View style={styles.inputContainer}> // Contenedor para el input y su etiqueta
    <Text style={styles.label}>{label}</Text> // Muestra la etiqueta del input
    <TextInput
      ref={ref} // Asigna la referencia al componente TextInput
      style={styles.input} // Aplica los estilos definidos
      onChangeText={onChangeText} // Callback que se llama al cambiar el texto
      value={value} // Valor actual del input
      editable={editable} // Determina si el input es editable o no
    />
  </View>
));

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default InputMiPerfil;
