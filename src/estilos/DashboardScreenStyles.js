import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Esto asegura que el contenedor ocupe todo el espacio disponible
    justifyContent: 'flex-start', // Alinea los componentes hacia la parte superior
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingTop: 120, // Reduce el padding superior
  },
  banner: {
    width: '90%',
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default styles;
