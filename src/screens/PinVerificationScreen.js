import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import styles from '../estilos/RecuperacionScreenStyles';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const PinVerificationScreen = ({ route, navigation }) => {
  // Estado para almacenar el PIN ingresado por el usuario
  const [pin, setPin] = useState('');
  // Extraer el email de los parámetros de la ruta
  const { email } = route.params;
// Función para manejar la verificación del PIN
  const handleVerifyPin = async () => {
    try {
      // Realizar una solicitud POST al servidor para verificar el PIN
      const response = await fetch(`${Constantes.IP}/Expo_Comodo/api/services/public/cliente.php?action=verificarPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${email}&pin=${pin}`,
      });

      const data = await response.json();

      if (data.status === 1) {
        // Si el PIN es válido, navegar a la pantalla de nueva contraseña
        navigation.navigate('NewPassword', { id_usuario: data.id_usuario, email: email });
      } else {
         // Si el PIN no es válido, mostrar una alerta
        Alert.alert('Error', data.error || 'PIN inválido o expirado');
      }
    } catch (error) {
      // Mostrar una alerta en caso de error de conexión
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