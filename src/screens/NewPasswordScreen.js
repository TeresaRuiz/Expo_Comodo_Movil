// NewPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import styles from '../estilos/RecuperacionScreenStyles';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const NewPasswordScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { id_usuario, email } = route.params;

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`${Constantes.IP}/Expo_Comodo/api/services/public/cliente.php?action=cambiarClaveConPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_usuario=${id_usuario}&nuevaClave=${newPassword}`,
      });

      const data = await response.json();

      if (data.status === 1) {
        Alert.alert('Éxito', 'Contraseña cambiada exitosamente');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un error al cambiar la contraseña');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        onChangeText={text => setNewPassword(text)}
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      <Button3 style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </Button3>
    </View>
  );
};

export default NewPasswordScreen;
