import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de instalar expo-vector-icons si no lo has hecho
import styles from '../estilos/Terminos&Condiciones'; // Asegúrate de que esta ruta sea correcta

// Componente de la pantalla de Términos y Condiciones
const TerminosCondicionesScreen = ({ navigation }) => {
  return (
    // Vista principal contenedora de toda la pantalla
    <View style={styles.container}>
      
      {/* Botón de retroceso para navegar a la pantalla anterior */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        {/* Icono de flecha hacia atrás usando Ionicons */}
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Contenedor para el contenido de términos y condiciones en formato de Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Título principal */}
        <Text style={styles.title}>¡Bienvenido a Nuestra Comunidad!</Text>
        
        {/* Párrafo inicial de introducción */}
        <Text style={styles.text}>
          Nos complace darte la bienvenida a nuestra aplicación. Antes de sumergirte en la experiencia, es importante que revises nuestros términos y condiciones para garantizar una interacción armoniosa y segura para todos.
        </Text>

        {/* Subtítulo y texto correspondiente a la sección de Uso Adecuado */}
        <Text style={styles.subtitle}>1. Uso Adecuado</Text>
        <Text style={styles.text}>
          Al utilizar nuestra aplicación, aceptas utilizarla de manera responsable y respetuosa con los demás usuarios. No se tolerarán comportamientos inapropiados, ofensivos o ilegales.
        </Text>

        {/* Subtítulo y texto correspondiente a la sección de Privacidad y Seguridad */}
        <Text style={styles.subtitle}>2. Privacidad y Seguridad</Text>
        <Text style={styles.text}>
          La privacidad y seguridad de nuestros usuarios es nuestra máxima prioridad. Nos comprometemos a proteger tus datos personales y a garantizar un entorno seguro para todas las interacciones.
        </Text>

        {/* Subtítulo y texto correspondiente a la sección de Contenido y Propiedad Intelectual */}
        <Text style={styles.subtitle}>3. Contenido y Propiedad Intelectual</Text>
        <Text style={styles.text}>
          Todo el contenido proporcionado en nuestra aplicación está sujeto a derechos de propiedad intelectual. No está permitido utilizar, copiar o distribuir dicho contenido sin autorización previa.
        </Text>
        
      </ScrollView>
    </View>
  );
};

// Exporta el componente para ser utilizado en otros archivos
export default TerminosCondicionesScreen;
