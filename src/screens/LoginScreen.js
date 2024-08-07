import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import styles from '../estilos/LoginScreenStyles'; // Import styles from an external file
import Button3 from '../componets/Buttons/Button3';
import LogOut from '../componets/LogOut';
import * as Constantes from '../utils/constantes'; // Import constants, assuming you have IP in a constants file

const LoginScreen = ({ navigation }) => {
  const ip = Constantes.IP; // Define API IP
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const animatedValue = new Animated.Value(0); // State for logo animation

  useEffect(() => {
    // Looping animation configuration
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );

    // Start the animation
    animation.start();

    // Clean up the animation when the component unmounts
    return () => {
      animation.stop();
    };
  }, []);

  // Interpolation for vertical translation animation of the logo
  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 0],
  });

  // Function to handle login
  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('UsuarioCliente', username); // Add username to form data
      formData.append('clave', password); // Add password to form data
      
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logIn`; // URL for the request
      console.log('URL solicitada:', url); // To verify the URL

      // Make the API request
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text(); // Get the response as text

      try {
        const data = JSON.parse(responseText); // Try to parse the response as JSON
        if (data.status) {
          navigation.navigate('DashboardTabs'); // Navigate to the dashboard tabs screen
        } else {
          showLoginErrorAlert(); // Show a custom alert in case of an error
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

  // Function to redirect to the registration screen
  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  // Function to redirect to the password recovery screen
  const handleForgotPasswordRedirect = () => {
    navigation.navigate('PasswordRecovery');
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=logOut`;
      console.log('URL solicitada:', url); // Verify the URL in the console

      const response = await fetch(url, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert('Sesión cerrada exitosamente');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  // Function to show login error alert
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
      {/* Animated logo */}
      <Animated.Image
        source={require('../img/calentamiento.png')}
        style={[styles.logo, { transform: [{ translateY }] }]}
      />
      {/* Screen title */}
      <Text style={styles.title}>Inicio de sesión</Text>
      {/* Username input */}
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      {/* Password input with visibility toggle */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword} // Ensure the password is secure
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      {/* Login button */}
      <Button3 style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button3>
      {/* Link to redirect to the registration screen */}
      <TouchableOpacity onPress={handleRegisterRedirect}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Crea una</Text>
      </TouchableOpacity>
      {/* Link to redirect to the password recovery screen */}
      <TouchableOpacity onPress={handleForgotPasswordRedirect}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <LogOut
        title="Cerrar Sesión"
        onPress={handleLogout}
        style={styles.logoutButton}
        textStyle={{ color: '#7f7f7f' }}
        icon={<Ionicons name="lock-closed" size={24} color="black" />}
      />
    </View>
  );
};

export default LoginScreen;
