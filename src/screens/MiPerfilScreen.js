import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MiPerfilScreen = () => {
  const [selectedGender, setSelectedGender] = useState('Male');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Data</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://example.com/profile.jpg' }} // Replace with the actual image URL or local image path
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIconContainer}>
          <Image
            source={{ uri: 'https://example.com/camera-icon.png' }} // Replace with the actual camera icon URL or local image path
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} placeholder="Dickey" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.input} placeholder="DK123" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput style={styles.input} placeholder="DK123@gmail.com" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} placeholder="2250-5555" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={['#ff5f6d', '#ffc371']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={['#42e695', '#3bb2b8']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Actualizar</Text>
          </LinearGradient>
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
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    elevation: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
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
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    justifyContent: 'center', // Añadido para centrar el texto verticalmente
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Reducido para dejar espacio para el texto
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MiPerfilScreen;

