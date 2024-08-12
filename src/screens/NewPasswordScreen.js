import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import styles from '../estilos/RecuperacionScreenStyles';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const NewPasswordScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la nueva contraseña
  const { id_usuario, email } = route.params; // Obtiene el id_usuario y el email de los parámetros de la ruta

  // Función para manejar el cambio de contraseña
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) { // Verifica que las contraseñas coincidan
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) { // Verifica que la nueva contraseña tenga al menos 6 caracteres
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Hace una solicitud para cambiar la contraseña
      const response = await fetch(`${Constantes.IP}/Expo_Comodo/api/services/public/cliente.php?action=cambiarClaveConPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_usuario=${id_usuario}&nuevaClave=${newPassword}`, // Envía el id_usuario y la nueva contraseña en el cuerpo de la solicitud
      });

      const data = await response.json();

      if (data.status === 1) { // Verifica si la solicitud fue exitosa
        Alert.alert('Éxito', 'Contraseña cambiada exitosamente', [
          { text: 'OK', onPress: () => navigation.navigate('Login') } // Navega a la pantalla de login después de mostrar el mensaje de éxito
        ]);
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
        onChangeText={text => setNewPassword(text)} // Actualiza el estado de newPassword cuando cambia el texto
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        onChangeText={text => setConfirmPassword(text)} // Actualiza el estado de confirmPassword cuando cambia el texto
        value={confirmPassword}
        secureTextEntry
      />
      <Button3 style={styles.button} onPress={handleChangePassword}> {/* Llama a handleChangePassword cuando se presiona el botón */}
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </Button3>
    </View>
  );
};

export default NewPasswordScreen;
