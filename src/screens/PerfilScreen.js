import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/c7/f9/fe/c7f9fe2e978b08473031c87f6fe657c2.jpg' }} // Replace with your image source
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Dickie</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem title="Mi perfil" icon="person-outline" />
        <MenuItem title="Historial" icon="settings-outline" />
        <MenuItem title="Terminos y condiciones" icon="document-text-outline" />
      </View>

      <View style={styles.socialContainer}>
        <Text style={styles.socialTitle}>Nuestras redes sociales</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <FontAwesome name="facebook" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="instagram" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="whatsapp" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ title, icon }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#000" />
    <Text style={styles.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    paddingVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  menuContainer: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  socialContainer: {
    marginTop: 30,
    backgroundColor: '#eef1f5',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default DashboardScreen;