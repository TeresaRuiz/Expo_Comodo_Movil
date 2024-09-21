import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
    const navigation = useNavigation(); // Inicializa la navegación
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Estado para el índice del slide actual
    const [imageAnimation] = useState(new Animated.Value(0)); // Estado para la animación de la imagen

    // Define las diapositivas para el onboarding
    const slides = [
        {
            id: '1',
            title: 'Encuentra tus zapatos ideales',
            description: 'Accede a una amplia variedad de zapatos y encuentra el par perfecto en "Comodo$"',
            image: require('../../assets/onboarding1.png'),
        },
        {
            id: '2',
            title: 'Compra fácil y seguro',
            description: 'Compra tus zapatos de manera segura y conveniente en nuestra tienda',
            image: require('../../assets/onboarding2.png'),
        },
        {
            id: '3',
            title: 'Entrega rápida y segura',
            description: 'Recibe tus zapatos en la comodidad de tu hogar de manera segura y oportuna',
            image: require('../../assets/onboarding3.png'),
        },
    ];

    // Efecto para iniciar la animación al montar el componente
    useEffect(() => {
        startImageAnimation(); // Inicia la animación de las imágenes

        return () => {
            imageAnimation.stopAnimation(); // Detiene la animación al desmontar el componente
        };
    }, []);

    // Función para iniciar la animación de la imagen
    const startImageAnimation = () => {
        Animated.loop( // Repite la animación en bucle
            Animated.sequence([ // Secuencia de animaciones
                Animated.timing(imageAnimation, {
                    toValue: 1, // Cambia el valor a 1
                    duration: 2000, // Duración de la animación
                    useNativeDriver: true, // Utiliza el driver nativo para mejor rendimiento
                }),
                Animated.timing(imageAnimation, {
                    toValue: 0, // Regresa el valor a 0
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start(); // Inicia la animación
    };

     // Maneja el avance a la siguiente diapositiva
    const handleNext = () => {
        if (currentSlideIndex < slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);  // Incrementa el índice
        } else {
            navigation.navigate('Login'); // Navega a la pantalla de login
        }
    };

    // Maneja el retroceso a la diapositiva anterior
    const handleBack = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1); // Decrementa el índice
        }
    };

    // Crea un componente animado para las imágenes
    const AnimatedImage = Animated.createAnimatedComponent(Image);

    // Renderiza la diapositiva actual
    const renderSlide = (slide) => (
        <View style={styles.slide} key={slide.id}>
            <Animated.View
                style={[
                    styles.imageContainer,
                    {
                        transform: [
                            {
                                scale: imageAnimation.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1, 1.1, 1],
                                }),
                            },
                            {
                                rotate: imageAnimation.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: ['0deg', '5deg', '0deg'],
                                }),
                            },
                        ],
                        opacity: imageAnimation.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [1, 0.7, 1],
                        }),
                    },
                ]}
            >
                <AnimatedImage source={slide.image} style={styles.image} />
            </Animated.View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
            <View style={styles.navigationButtons}>
                {currentSlideIndex > 0 && (
                    <TouchableOpacity style={styles.button} onPress={handleBack}>
                        <Text style={styles.buttonText}>Atrás</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>{currentSlideIndex < slides.length - 1 ? 'Adelante' : 'Comenzar'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderSlide(slides[currentSlideIndex])}
        </View>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Color de fondo
    },
    slide: {
        flex: 1,
        justifyContent: 'center', // Centra el contenido
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    imageContainer: {
        marginBottom: 40, // Espacio debajo de la imagen
    },
    image: {
        width: 350, // Ancho de la imagen
        height: 350, // Alto de la imagen
        resizeMode: 'contain', // Modo de ajuste de la imagen
    },
    title: {
        fontSize: 24,  // Tamaño de fuente del título
        fontWeight: 'bold', // Peso de la fuente
        marginBottom: 10, // Margen inferior
        color: '#333', // Color del texto
    },
    description: {
        fontSize: 18, // Tamaño de fuente de la descripción
        textAlign: 'center',  // Alineación del texto
        color: '#666', // Color del texto
        paddingHorizontal: 30, // Espaciado horizontal
    },
    navigationButtons: {
        flexDirection: 'row', // Disposición en fila de los botones
        marginTop: 20, // Margen superior
    },
    button: {
        marginHorizontal: 10, // Espaciado horizontal entre botones
        width: 100, // Ancho del botón
        height: 50, // Alto del botón
        backgroundColor: '#3527ae', // Color de fondo del botón
        borderRadius: 25, // Bordes redondeados
        justifyContent: 'center', // Centra el contenido del botón
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // Color del texto del botón
        fontSize: 18,  // Tamaño de fuente del texto
        fontWeight: 'bold', // Peso de la fuente
    }, 
});

// Exporta el componente
export default Onboarding;
