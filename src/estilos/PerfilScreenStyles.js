import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1, // Permite que el contenedor crezca si es necesario, ocupando el espacio disponible
      backgroundColor: '#f0f4f7', // Color de fondo del contenedor principal
      paddingVertical: 20, // Espaciado vertical en la parte superior e inferior
    },
    profileContainer: {
      alignItems: 'center', // Centra los elementos hijos horizontalmente
      marginBottom: 20, // Margen inferior para separar del siguiente elemento
      paddingVertical: 30, // Espaciado vertical interno
      backgroundColor: '#ffffff', // Color de fondo del contenedor del perfil
      borderRadius: 20, // Esquinas redondeadas del contenedor
      marginHorizontal: 20, // Margen horizontal en los lados
      elevation: 5, // Sombra en plataformas Android para dar profundidad
    },
    profileImage: {
      width: 80, // Ancho de la imagen del perfil
      height: 80, // Alto de la imagen del perfil
      borderRadius: 40, // Esquinas redondeadas para hacer la imagen circular
      marginBottom: 10, // Margen inferior para separar de la siguiente línea de texto
    },
    profileName: {
      fontSize: 18, // Tamaño de fuente del nombre del perfil
      fontWeight: 'bold', // Estilo de fuente en negrita
    },
    profileSubtitle: {
      fontSize: 14, // Tamaño de fuente del subtítulo del perfil
      color: '#777', // Color del texto del subtítulo (gris)
    },
    menuContainer: {
      marginHorizontal: 20, // Margen horizontal en los lados
      backgroundColor: '#ffffff', // Color de fondo del contenedor del menú
      borderRadius: 20, // Esquinas redondeadas del contenedor
      paddingVertical: 10, // Espaciado vertical interno
      elevation: 5, // Sombra para dar profundidad en Android
    },
    menuItem: {
      flexDirection: 'row', // Disposición horizontal de los elementos en el menú
      alignItems: 'center', // Centra los elementos dentro del menú verticalmente
      paddingVertical: 15, // Espaciado vertical interno
      paddingHorizontal: 20, // Espaciado horizontal interno
      borderBottomWidth: 1, // Ancho de la línea en la parte inferior
      borderBottomColor: '#ddd', // Color de la línea en la parte inferior
    },
    menuItemText: {
      fontSize: 16, // Tamaño de fuente del texto del elemento del menú
      marginLeft: 15, // Margen izquierdo para separar del ícono
    },
    socialContainer: {
      marginTop: 30, // Margen superior para separar del contenido anterior
      backgroundColor: '#eef1f5', // Color de fondo del contenedor de redes sociales
      paddingVertical: 15, // Espaciado vertical interno
      alignItems: 'center', // Centra los elementos hijos horizontalmente
      borderRadius: 20, // Esquinas redondeadas del contenedor
      marginHorizontal: 20, // Margen horizontal en los lados
      elevation: 5, // Sombra para dar profundidad en Android
    },
    socialTitle: {
      fontSize: 16, // Tamaño de fuente del título de la sección de redes sociales
      fontWeight: 'bold', // Estilo de fuente en negrita
      color: '#000', // Color del texto (negro)
      marginBottom: 10, // Margen inferior para separar del contenido siguiente
    },
    socialIcons: {
      flexDirection: 'row', // Disposición horizontal de los íconos sociales
      justifyContent: 'space-around', // Distribuye el espacio de manera uniforme entre los íconos
      width: '60%', // Ancho del contenedor de íconos sociales
    },
});

export default styles;
