import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 60,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 1, // Asegura que el botón esté por encima de otros elementos
  },
});

export default styles;
