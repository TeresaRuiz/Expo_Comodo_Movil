import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import styles from '../estilos/RecuperacionScreenStyles';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const PasswordRecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecovery = async () => {
    try {
      const response = await fetch(`${Constantes.IP}/Expo_Comodo/api/services/public/cliente.php?action=solicitarPinRecuperacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${email}`,
      });

      const data = await response.json();

      if (data.status === 1) {
        Alert.alert('Éxito', 'Se ha enviado un PIN a tu correo electrónico');
        navigation.navigate('PinVerification', { email });
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un error al solicitar el PIN');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Image source={require('../img/recuperarconra.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <Button3 style={styles.button} onPress={handleRecovery}>
        <Text style={styles.buttonText}>Enviar PIN de recuperación</Text>
      </Button3>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordRecoveryScreen;