import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AppState, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import styles from '../estilos/LoginScreenStyles'; // Import styles from an external file
import Button3 from '../componets/Buttons/Button3';
import LogOut from '../componets/Buttons/LogOut';
import * as Constantes from '../utils/constantes'; 

const LoginScreen = ({ navigation }) => {
  const ip = Constantes.IP; // Define API IP
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const animatedValue = new Animated.Value(0); // State for logo animation
  const appState = useRef(AppState.currentState); // Referencia al estado de la aplicación
  
  useEffect(() => {
    validarSesion(); // Verificar si hay sesión activa al cargar la pantalla
  }, []);

  // Función para validar si hay sesión activa
  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
  
      const data = await response.json();
  
      if (data.status === 1) {
        navigation.navigate('DashboardTabs');
        console.log("Se ingresa con la sesión activa")
      } else {
        console.log("No hay sesión activa")
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 0],
  });

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, complete los campos de usuario y contraseña');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('UsuarioCliente', username);
      formData.append('clave', password);
      
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logIn`;
      console.log('URL solicitada:', url);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);
        if (data.status) {
          setUsername('');
          setPassword('');
          navigation.navigate('DashboardTabs');
        } else {
          showLoginErrorAlert();
        }
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError);
        console.error('Respuesta recibida:', responseText);
        Alert.alert('Error', 'Ocurrió un error al procesar la respuesta del servidor');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  const handleForgotPasswordRedirect = () => {
    navigation.navigate('PasswordRecovery');
  };

  const showLoginErrorAlert = () => {
    Alert.alert(
      'Error de inicio de sesión',
      'Usuario o contraseña incorrectos',
      [
        {
          text: 'OK',
          style: 'default',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('Alert dismissed'),
      }
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../img/calentamiento.png')}
        style={[styles.logo, { transform: [{ translateY }] }]}
      />
      <Text style={styles.title}>Inicio de sesión</Text>
  
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      
      <Button3 style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button3>
      
      <TouchableOpacity onPress={handleRegisterRedirect}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Crea una</Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={handleForgotPasswordRedirect}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
