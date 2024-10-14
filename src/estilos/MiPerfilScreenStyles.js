import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      paddingHorizontal: 20,
      paddingTop: 25,
      paddingBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
    },
    mapContainer: {
      flex: 1,               // Usa flex para adaptarse al tamaño de la pantalla
      width: '100%',          // Ocupa todo el ancho del contenedor
      height: 300,            // Mantén o ajusta esta altura
      marginTop: 20,          // Margen superior
      marginBottom: 20,       // Margen inferior
    },
    map: {
      width: '100%',          // Ancho del mapa al 100%
      height: '100%',         // Altura del mapa al 100%
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
      justifyContent: 'space-between',  // Espacio entre botones
      width: '50%',
      marginTop: 20,                    // Ajusta margen superior
    },
    button: {
      width: '48%',                     // Ancho relativo del 48%
      borderRadius: 25,
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#283AE2',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    updateButton: {
      backgroundColor: '#009929', // Verde para botón "Actualizar"
    },
    deleteButton: {
      backgroundColor: '#ca0b0b', // Rojo para botón "Cancelar"
    },
    updateButtonText: {
      color: '#fff',
    },
    deleteButtonText: {
      color: '#fff',
    },
    backIcon: {
      position: 'absolute',
      top: 15,
      left: 25,
      zIndex: 10, // Asegura que esté encima de otros elementos
    },
});

export default styles;
