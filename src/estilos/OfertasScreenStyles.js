import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Cambiado de '#fff' a '#f5f5f5'
  },
  promoImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  listContainer: {
    paddingBottom: 20,
  },
  ofertaCard: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff', // Añadido para mantener consistencia con el primer estilo
  },
  ofertaImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  ofertaDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  ofertaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Cambiado a '#333' para mantener consistencia
  },
  ofertaDescription: {
    fontSize: 14,
    color: '#666', // Cambiado de '#555' a '#666'
  },
  ofertaPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ofertaPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3046BC', // Cambiado de '#000' a '#333'
  },
  discountBadge: {
    backgroundColor: '#3046BC', // Cambiado de '#ff4444' a '#3046BC'
    borderRadius: 5,
    padding: 3,
    marginLeft: 10,
  },
  discountText: {
    color: '#F0F8FF',
    fontSize: 12,
    marginLeft: 25,
    borderWidth: 1, // Ancho del borde
    borderColor: '#3046BC', // Color del borde
    borderRadius: 5, // Radio del borde (esquinas redondeadas)
    padding: 2, // Espacio entre el texto y el borde
    backgroundColor: '#3046BC', // Fondo del texto (opcional)
  },
  noOfertasText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#3046BC', // Cambiado de '#555' a '#666'
    marginTop: 20,
  },
});


export default styles;

