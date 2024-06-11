import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const MiPerfilScreen = () => {
  const [selectedGender, setSelectedGender] = useState('Male');
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const nombreRef = useRef(null);
  const usernameRef = useRef(null);
  const correoRef = useRef(null);
  const telefonoRef = useRef(null);

  const handleUpdate = () => {
    // Lógica para actualizar
  };

  const handleDelete = () => {
    setNombre('');
    setUsername('');
    setCorreo('');
    setTelefono('');
    nombreRef.current.clear();
    usernameRef.current.clear();
    correoRef.current.clear();
    telefonoRef.current.clear();
  };

  const handleNombreChange = (text) => {
    // Expresión regular para aceptar solo letras, espacios y tildes
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/;
    if (regex.test(text) || text === '') {
      // Actualizar el estado solo si la entrada es válida
      setNombre(text);
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleCorreoChange = (text) => {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(text) || text === '') {
      setCorreo(text);
    }
  };

  const handleTelefonoChange = (text) => {
    // Actualizar el estado del teléfono
    setTelefono(text);
  };

  const handleUpdatePress = () => {
    // Verificar si se han completado todos los campos obligatorios
    if (!nombre || !correo || !telefono || !username) {
      Alert.alert('Falta información', 'Por favor completa todos los campos obligatorios.');
      return;
    }
    // Lógica para actualizar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos Personales</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg' }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          ref={nombreRef}
          style={styles.input}
          placeholder="Dickey"
          keyboardType="default"
          onChangeText={handleNombreChange}
          value={nombre}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          ref={usernameRef}
          style={styles.input}
          placeholder="DK123"
          keyboardType="email-address"
          onChangeText={handleUsernameChange}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          ref={correoRef}
          style={styles.input}
          placeholder="DK123@gmail.com"
          keyboardType="email-address"
          onChangeText={handleCorreoChange}
          value={correo}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          ref={telefonoRef}
          style={styles.input}
          placeholder="2250-5555"
          keyboardType="phone-pad"
          onChangeText={handleTelefonoChange}
          value={telefono}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdatePress}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
});

export default MiPerfilScreen;
