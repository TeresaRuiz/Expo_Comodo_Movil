import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  promoImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20, // Añade un margen inferior para dar espacio
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  ofertaCard: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    marginLeft: 10,
  },
  ofertaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ofertaDescription: {
    fontSize: 14,
    color: '#666',
  },
  ofertaPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ofertaPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3046BC',
  },
  discountBadge: {
    backgroundColor: '#3046BC',
    borderRadius: 5,
    padding: 3,
    marginLeft: 10,
  },
  discountText: {
    color: '#F0F8FF',
    fontSize: 12,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: '#3046BC',
    borderRadius: 5,
    padding: 2,
    backgroundColor: '#3046BC',
  },
  noOfertasText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#3046BC',
    marginTop: 20,
  },
});

export default styles;
