import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styles from '../estilos/MiPerfilScreenStyles';

const MiPerfilScreen = () => {
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
          onChangeText={setNombre}
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
          onChangeText={setUsername}
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
          onChangeText={setCorreo}
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
          onChangeText={setTelefono}
          value={telefono}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
          <Text style={[styles.buttonText, styles.updateButtonText]}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default MiPerfilScreen;
