import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Button3 = ({ onPress, title, style }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, style]} 
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 400,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button3;
