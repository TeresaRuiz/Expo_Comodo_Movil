import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import styles from '../estilos/RecuperacionScreenStyles';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const PinVerificationScreen = ({ route, navigation }) => {
  const [pin, setPin] = useState('');
  const { email } = route.params;

  const handleVerifyPin = async () => {
    try {
      const response = await fetch(`${Constantes.IP}/Expo_Comodo/api/services/public/cliente.php?action=verificarPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${email}&pin=${pin}`,
      });

      const data = await response.json();

      if (data.status === 1) {
        // PinVerificationScreen
        navigation.navigate('NewPassword', { id_usuario: data.id_usuario, email: email });

      } else {
        Alert.alert('Error', data.error || 'PIN inválido o expirado');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar PIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el PIN"
        onChangeText={text => setPin(text)}
        value={pin}
        keyboardType="numeric"
      />
      <Button3 style={styles.button} onPress={handleVerifyPin}>
        <Text style={styles.buttonText}>Verificar PIN</Text>
      </Button3>
    </View>
  );
};

export default PinVerificationScreen;