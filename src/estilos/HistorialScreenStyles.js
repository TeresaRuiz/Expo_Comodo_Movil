import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    left: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  nombre_producto: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 40,
  },
  ofertaImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  ofertaDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  ofertaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  ofertaDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  fecha: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  subTotal: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  ofertaPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ofertaPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  discountBadge: {
    backgroundColor: '#3046BC',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  discountText: {
    fontSize: 12,
    color: '#fff',
  },
  
 // Estilo para la tarjeta de fecha
 fechaCardContainer: {
   backgroundColor: 'white',
   borderRadius: 10,
   marginBottom: 10,
   marginHorizontal: 10,
   elevation: 3,
   shadowColor: '#000',
   shadowOffset: { width: 0, height:2 },
   shadowOpacity :0.25, 
   shadowRadius :3.84, 
   overflow : 'hidden', // Asegura que el contenido expandido no se salga de los bordes redondeados
   paddingVertical :10, // Agrega padding vertical para mejorar el área táctil
 },

 fechaCardHeader :{
   flexDirection : 'row', 
   justifyContent : 'space-between', 
   alignItems : 'center', 
   padding :15, 
   backgroundColor :'white', 
 },

 fechaCardInfo :{
   flex :1, 
 },

 fechaCardTitle :{
   fontSize :18, 
   fontWeight :'bold', 
   color :'#333', 
 },

 fechaCardSubtitle :{
   fontSize :14, 
   color :'#666', 
   marginTop :5, 
 },

 fechaCardContent :{
   paddingHorizontal :15, 
   paddingBottom :15, 
   backgroundColor :'#f9f9f9', // Un color de fondo ligeramente diferente para el contenido expandido
 },

 ofertaCard :{
   flexDirection :'row', 
   borderRadius :8, 
   marginVertical :5, 
   padding :10, 
   backgroundColor :'white', 
   shadowColor :'#000', 
   shadowOffset :{ width :0, height :1 }, 
   shadowOpacity :0.2, 
   shadowRadius :1.41, 
   elevation :2, 
 }
});

export default styles;