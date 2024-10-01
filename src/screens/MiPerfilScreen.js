import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Importa componentes de mapa y marcador
import { Ionicons } from '@expo/vector-icons'; // Iconos de la librería Ionicons
import styles from '../estilos/MiPerfilScreenStyles'; // Importa estilos personalizados
import * as Constantes from '../utils/constantes'; // Importa constantes
import InputMiPerfil from '../componets/Inputs/InputMiPerfil'; // Componente de entrada personalizado
import axios from 'axios'; // Axios para realizar peticiones HTTP
import { useInactividadSesion } from '../componets/Hooks/inactividad.js'; // Hook personalizado para manejo de inactividad

const MiPerfilScreen = ({ navigation }) => {
  const ip = Constantes.IP; // IP del servidor desde las constantes
  const { panHandlers, handleLogout } = useInactividadSesion(); // Destructura las funciones del hook de inactividad

  // Función para formatear el número de teléfono
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Elimina cualquier caracter no numérico
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})$/); // Agrupa el número en formato XXXX-XXXX
    if (match) {
      return !match[2] ? match[1] : `${match[1]}-${match[2]}`; // Si solo hay 4 dígitos, muestra solo la primera parte
    }
    return cleaned;
  };

  // Maneja el cambio del teléfono y lo formatea
  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setTelefono(formatted);
  };

  // Estados para almacenar datos del perfil y otros controles
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(true); // Indica si se está cargando la pantalla
  const [region, setRegion] = useState({
    latitude: 13.6929, // Coordenadas por defecto
    longitude: -89.2182,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [editando, setEditando] = useState(false); // Controla si el usuario está en modo edición
  const [refreshing, setRefreshing] = useState(false); // Controla el estado de refresco de pantalla

  // Referencias a los campos de entrada
  const nombreRef = useRef(null);
  const usernameRef = useRef(null);
  const correoRef = useRef(null);
  const direccionRef = useRef(null);
  const telefonoRef = useRef(null);

  // Función para obtener el perfil del servidor
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${ip}/Expo_Comodo/api/services/public/cliente.php?action=readProfile`);
      const data = await response.json();

      if (data.status) {
        // Si los datos se obtienen correctamente, actualiza los estados
        setNombre(data.dataset.nombre);
        setUsername(data.dataset.usuario);
        setCorreo(data.dataset.correo);
        setDireccion(data.dataset.direccion_cliente);
        setTelefono(data.dataset.telefono);

        // Utiliza la API de Nominatim para convertir la dirección en coordenadas
        const nominatimResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: data.dataset.direccion_cliente,
            format: 'json',
            limit: 1,
          },
        });

        // Si la API devuelve resultados, actualiza la región del mapa
        if (nominatimResponse.data.length > 0) {
          const { lat, lon } = nominatimResponse.data[0];
          const newRegion = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion); // Actualiza la región del mapa
        } else {
          setRegion({
            latitude: 13.6929, // Si no encuentra la ubicación, usa las coordenadas por defecto
            longitude: -89.2182,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          Alert.alert('Error', 'No se encontró la ubicación');
        }
      } else {
        Alert.alert('Error', data.error); // Muestra un error si la petición falla
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error); // Log del error en la consola
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false); // Termina la carga
      setRefreshing(false); // Finaliza el refresco
    }
  };

  // Función para actualizar el perfil
  const handleUpdate = async () => {
    if (!nombre || !username || !correo || !direccion || !telefono) {
      Alert.alert('Error', 'Todos los campos deben ser llenados'); // Validación básica de los campos
      return;
    }

    try {
      // Crea un objeto FormData para enviar los datos
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('correo', correo);
      formData.append('username', username);
      formData.append('telefono', telefono);
      formData.append('direccion', direccion);

      // URL de la API para actualizar el perfil
      const url = `${ip}/Expo_Comodo/api/services/public/cliente.php?action=editProfile`;

      // Envía la solicitud de actualización al servidor
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
        setEditando(false); // Desactiva el modo de edición
      } else {
        Alert.alert('Error', responseJson.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Función para cancelar la edición y restaurar los datos originales
  const handleDelete = () => {
    setNombre('');
    setUsername('');
    setCorreo('');
    setDireccion('');
    setTelefono('');
    setEditando(false);
    fetchProfile(); // Vuelve a cargar los datos del perfil
  };

  // Función para obtener la dirección textual a partir de las coordenadas
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat: lat,
          lon: lon,
          format: 'json',
        },
      });

      if (response.data && response.data.display_name) {
        setDireccion(response.data.display_name); // Actualiza la dirección con la obtenida por geocodificación
      } else {
        Alert.alert('Error', 'No se encontró la dirección para esta ubicación');
      }
    } catch (error) {
      console.error('Reverse Geocode Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener la dirección');
    }
  };

  // Función que maneja los toques en el mapa
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    if (editando) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion); // Actualiza la región del mapa
      reverseGeocode(latitude, longitude); // Llama a la geocodificación inversa para obtener la dirección
    }
  };

  // Función para refrescar los datos
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfile(); // Vuelve a obtener los datos del perfil
  };

  // Efecto que se ejecuta al montar el componente, para cargar los datos del perfil
  useEffect(() => {
    fetchProfile();
  }, []);

  // Si los datos están cargando, muestra un indicador de carga
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
        {/* Botón para volver atrás */}
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        {/* Foto de perfil */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.profileImage}
          />
        </View>

        {/* Título */}
        <Text style={styles.titulo}>Mi Perfil</Text>

        {/* Campos del perfil */}
        <InputMiPerfil
          label="Nombre"
          value={nombre}
          editable={editando}
          onChangeText={setNombre}
          inputRef={nombreRef}
        />
        <InputMiPerfil
          label="Usuario"
          value={username}
          editable={editando}
          onChangeText={setUsername}
          inputRef={usernameRef}
        />
        <InputMiPerfil
          label="Correo Electrónico"
          value={correo}
          editable={editando}
          onChangeText={setCorreo}
          inputRef={correoRef}
        />
        <InputMiPerfil
          label="Teléfono"
          value={telefono}
          editable={editando}
          onChangeText={handlePhoneChange}
          inputRef={telefonoRef}
        />
        <InputMiPerfil
          label="Dirección"
          value={direccion}
          editable={editando}
          onChangeText={setDireccion}
          inputRef={direccionRef}
        />

        {/* Mapa para seleccionar ubicación */}
        <MapView
          style={styles.map}
          region={region}
          onPress={handleMapPress}
        >
          <Marker coordinate={region} />
        </MapView>

        {/* Botones para editar/actualizar/cancelar */}
        {!editando ? (
          <TouchableOpacity
            style={styles.botonEditar}
            onPress={() => setEditando(true)}
          >
            <Text style={styles.textoBoton}>Editar</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.botonActualizar}
              onPress={handleUpdate}
            >
              <Text style={styles.textoBoton}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botonCancelar}
              onPress={handleDelete}
            >
              <Text style={styles.textoBoton}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default MiPerfilScreen;
