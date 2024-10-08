import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Definición del componente Button3
const Button3 = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.defaultButton, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: '#007BFF', // Color de fondo por defecto
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button3;
