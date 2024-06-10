import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const categories = [
    { title: 'Categorias', icon: 'grid-outline' },
    { title: 'Productos', icon: 'pricetag-outline' },
    { title: 'Descuentos', icon: 'pricetags-outline' }
  ];

  const animatedValues = categories.map(() => useRef(new Animated.Value(0)).current);

  const handlePressIn = (index) => {
    Animated.timing(animatedValues[index], {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const cardBackgroundColor = (index) => {
    return animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', '#ffd700'], // from white to bright yellow
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Comodo$</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
          >
            <Animated.View style={[styles.card, { backgroundColor: cardBackgroundColor(index) }]}>
              <Ionicons name={category.icon} size={40} color="#000" />
              <Text style={styles.cardTitle}>{category.title}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="lock-closed" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // light grey background color for a modern look
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // dark grey color for the title
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
    color: '#333', // dark grey color for card titles
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default DashboardScreen;
