import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PasswordRecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecovery = () => {
    // Aquí puedes agregar la lógica para enviar un correo electrónico de recuperación de contraseña
    console.log('Se enviará un correo electrónico de recuperación a:', email);

    // Aquí podrías agregar la lógica para enviar el correo electrónico de recuperación
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleRecovery}>
        <Text style={styles.buttonText}>Enviar correo de recuperación</Text>
      </TouchableOpacity>
      {/* Agregar el enlace para ir al inicio de sesión */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default PasswordRecoveryScreen;
