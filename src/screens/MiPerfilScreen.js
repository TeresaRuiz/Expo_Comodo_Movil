import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/MiPerfilScreenStyles'; 
import * as Constantes from '../utils/constantes';
import { TextInputMask } from 'react-native-masked-text';
import InputMiPerfil from '../componets/Inputs/InputMiPerfil';

const MiPerfilScreen = ({ navigation }) => {
  const ip = Constantes.IP;
  const openCageApiKey = '052db57c37214995836949fa033d4518'; // Reemplaza con tu clave de API de OpenCage

  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 13.6929,
    longitude: -89.2182,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [editando, setEditando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const nombreRef = useRef(null);
  const usernameRef = useRef(null);
  const correoRef = useRef(null);
  const direccionRef = useRef(null);
  const telefonoRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/cliente.php?action=readProfile`);
      const data = await response.json();

      if (data.status) {
        setNombre(data.dataset.nombre);
        setUsername(data.dataset.usuario);
        setCorreo(data.dataset.correo);
        setDireccion(data.dataset.direccion_cliente);
        setTelefono(data.dataset.telefono);

        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(data.dataset.direccion_cliente)}&key=${openCageApiKey}`;
        const geoResponse = await fetch(url);
        const geoData = await geoResponse.json();

        if (geoData.results.length > 0) {
          const { lat, lng } = geoData.results[0].geometry;
          const newRegion = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
        } else {
          setRegion({
            latitude: 13.6929,
            longitude: -89.2182,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          Alert.alert('Error', 'No se encontró la ubicación');
        }
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleUpdate = async () => {
    if (!nombre || !username || !correo || !direccion || !telefono) {
      Alert.alert('Error', 'Todos los campos deben ser llenados');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('correo', correo);
      formData.append('username', username);
      formData.append('telefono', telefono);
      formData.append('direccion', direccion);

      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=editProfile`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseJson = await response.json();

      if (responseJson.status === 1) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
        setEditando(false);
      } else {
        Alert.alert('Error', responseJson.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  const handleDelete = () => {
    setNombre('');
    setUsername('');
    setCorreo('');
    setDireccion('');
    setTelefono('');
    setEditando(false);
    fetchProfile();
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${openCageApiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const address = data.results[0].formatted;
        setDireccion(address);
      } else {
        Alert.alert('Error', 'No se encontró la dirección para esta ubicación');
      }
    } catch (error) {
      console.error('Reverse Geocode Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener la dirección');
    }
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    if (editando) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      reverseGeocode(latitude, longitude);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Datos personales</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg' }}
            style={styles.profileImage}
          />
        </View>

        <InputMiPerfil
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          editable={editando}
          ref={nombreRef}
        />

        <InputMiPerfil
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          editable={editando}
          ref={usernameRef}
        />

        <InputMiPerfil
          label="Correo"
          value={correo}
          onChangeText={setCorreo}
          editable={editando}
          ref={correoRef}
        />

        <TextInputMask
          type={'custom'}
          options={{
            mask: '9999-9999',
          }}
          value={telefono}
          onChangeText={setTelefono}
          editable={editando}
          style={[styles.input, editando ? {} : { backgroundColor: '#f0f0f0' }]}
          placeholder="Teléfono"
          keyboardType="numeric"
          ref={telefonoRef}
        />

        <InputMiPerfil
          label="Dirección"
          value={direccion}
          onChangeText={setDireccion}
          editable={editando}
          ref={direccionRef}
        />

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
            <Marker coordinate={region} />
          </MapView>
        </View>

        <View style={styles.buttonContainer}>
          {editando ? (
            <>
              <TouchableOpacity
                style={[styles.button]}
                onPress={handleUpdate}
              >
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditando(true)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MiPerfilScreen;
