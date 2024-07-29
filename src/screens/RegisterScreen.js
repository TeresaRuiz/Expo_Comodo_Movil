import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import DebouncedSearchInput from '../screens/DebouncedSearchInput';
import styles from '../estilos/RegisterScreenStyles';
import * as Constantes from '../utils/constantes';
import Button3 from '../componets/Buttons/Button3';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setTelefono] = useState('');
  const [dui, setDui] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({
    latitude: 13.69294,
    longitude: -89.21819,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation();
  const ip = Constantes.IP;

  const handleRegister = async () => {
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

    if (password !== password2) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

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

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({
      ...location,
      latitude,
      longitude,
    });

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
      if (response.data && response.data.display_name) {
        const formattedAddress = response.data.display_name;
        setAddress(formattedAddress);
      } else {
        setAddress('Dirección no disponible');
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      setAddress('Error al obtener la dirección');
    }
  };

  const handleSearchAddress = async (text) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&addressdetails=1`);
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({
          ...location,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
    }
  };

  const handleClearAddress = () => {
    setAddress('');
    setLocation({
      latitude: 13.69294,
      longitude: -89.21819,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('../img/registro.png')} style={styles.logo} />
        <Text style={styles.title}>Registro</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetir contraseña"
        onChangeText={text => setPassword2(text)}
        value={password2}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        onChangeText={text => setTelefono(text)}
        value={phone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="DUI"
        onChangeText={text => setDui(text)}
        value={dui}
      />
      <View style={styles.addressContainer}>
        <DebouncedSearchInput
          onSearch={handleSearchAddress}
          value={address}
          onChangeText={handleAddressChange}
        />
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAddress}>
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={location}
        onPress={handleMapPress}
      >
        <Marker coordinate={location} />
      </MapView>
      <Button3 style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </Button3>
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.loginRedirectText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;
