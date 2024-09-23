import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import DebouncedSearchInput from '../screens/DebouncedSearchInput';
import styles from '../estilos/RegisterScreenStyles';
import * as Constantes from '../utils/constantes';
import Button3 from '../componets/Buttons/Button3';

// Componente de registro de usuario
const RegisterScreen = () => {
  // Estado para manejar los datos del formulario
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setTelefono] = useState('');
  const [dui, setDui] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Muestra/oculta la contraseña
  const [showPassword2, setShowPassword2] = useState(false); // Muestra/oculta la confirmación de la contraseña
  const [location, setLocation] = useState({
    latitude: 13.69294,
    longitude: -89.21819,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation(); // Hook de navegación
  const ip = Constantes.IP; // Obtiene la IP desde las constantes

  // Función para formatear el número de teléfono
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})$/); // Agrupa el número en partes
    if (match) {
      return !match[2] ? match[1] : `${match[1]}-${match[2]}`; // Formatea el número en formato XXXX-XXXX
    }
    return cleaned;
  };

  // Solicita permiso para acceder a la ubicación y la obtiene
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la ubicación');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Función para formatear el DUI
  const formatDUI = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    const match = cleaned.match(/^(\d{0,8})(\d{0,1})$/); // Agrupa el DUI
    if (match) {
      return !match[2] ? match[1] : `${match[1]}-${match[2]}`; // Formatea el DUI en formato XXXXXXXX-X
    }
    return cleaned;
  };

  // Manejadores para actualizar el estado de teléfono y DUI con el formato correcto
  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setTelefono(formatted);
  };

  const handleDUIChange = (text) => {
    const formatted = formatDUI(text);
    setDui(formatted);
  };

  // Función que maneja el registro de usuario
  const handleRegister = async () => {
    // Verifica si todos los campos están llenos
    if (
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !password2.trim() ||
      !phone.trim() ||
      !dui.trim() ||
      !address.trim()
    ) {
      Alert.alert('Error', 'Debes llenar todos los campos');
      return;
    }

    // Verifica si las contraseñas coinciden
    if (password !== password2) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Intenta realizar el registro del usuario
    try {
      const formData = new FormData();
      formData.append('nombreCliente', name);
      formData.append('usuarioCliente', username);
      formData.append('correoCliente', email);
      formData.append('claveCliente', password);
      formData.append('confirmarClave', password2);
      formData.append('telefonoCliente', phone);
      formData.append('duiCliente', dui);
      formData.append('direccionCliente', address);

      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/cliente.php?action=signUpMovil`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        // Si el registro fue exitoso, muestra un mensaje y redirige al login
        Alert.alert('Éxito', 'Usuario creado correctamente', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('Error', `Error: ${data.error}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar crear el usuario');
    }
  };

  // Redirecciona al usuario a la pantalla de login
  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };
  
  // Maneja el evento cuando se presiona en el mapa para actualizar la ubicación
  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({
      ...location,
      latitude,
      longitude,
    });

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: 'json',
          lat: latitude,
          lon: longitude,
          addressdetails: 1,
        },
      });

      if (response.data && response.data.display_name) {
        setAddress(response.data.display_name); // Actualiza la dirección obtenida desde la API
      } else {
        setAddress('Dirección no disponible');
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      setAddress('Error al obtener la dirección');
    }
  };

  // Busca la dirección introducida por el usuario usando una API de búsqueda
  const handleSearchAddress = async (text) => {
    if (!text.trim()) {
      return;
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: text,
          format: 'json',
          limit: 1,
        },
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({
          ...location,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
        setAddress(response.data[0].display_name);
      } else {
        Alert.alert('Error', 'No se encontraron resultados para la dirección proporcionada');
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
      Alert.alert('Error', 'Error al buscar la dirección. Por favor, intenta nuevamente.');
    }
  };

  // Limpia la dirección y la ubicación en el mapa
  const handleClearAddress = () => {
    setAddress('');
    setLocation({
      latitude: 13.69294,
      longitude: -89.21819,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  // Cambia la dirección introducida manualmente por el usuario
  const handleAddressChange = (text) => {
    setAddress(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título e imagen de registro */}
      <View style={styles.titleContainer}>
        <Image source={require('../img/registro.png')} style={styles.logo} />
        <Text style={styles.title}>Registro</Text>
      </View>

      {/* Campo de entrada para el nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={text => setName(text)}
        value={name}
      />

      {/* Campo de entrada para el nombre de usuario */}
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={text => setUsername(text)}
        value={username}
      />

      {/* Campo de entrada para el correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      {/* Campo de entrada para la contraseña con opción de mostrar/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Campo de entrada para repetir la contraseña con opción de mostrar/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Repetir contraseña"
          onChangeText={text => setPassword2(text)}
          value={password2}
          secureTextEntry={!showPassword2}
        />
        <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)} style={styles.eyeIcon}>
          <Icon name={showPassword2 ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Campo de entrada para el teléfono */}
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        onChangeText={handlePhoneChange}
        value={phone}
        keyboardType="phone-pad"
        maxLength={9}
      />

      {/* Campo de entrada para el DUI */}
      <TextInput
        style={styles.input}
        placeholder="DUI"
        onChangeText={handleDUIChange}
        value={dui}
        keyboardType="number-pad"
        maxLength={10}
      />

      {/* Campo de entrada para la dirección con opción de búsqueda */}
      <View style={styles.addressContainer}>
        <DebouncedSearchInput
          onSearch={handleSearchAddress}
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAddress}>
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      {/* Mapa que muestra la ubicación actual */}
      <MapView
        style={styles.map}
        region={location}
        onPress={handleMapPress}
      >
        <Marker coordinate={location} />
      </MapView>

      {/* Botón de registro */}
      <Button3 style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </Button3>

      {/* Redireccionar al login */}
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.loginRedirectText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;
