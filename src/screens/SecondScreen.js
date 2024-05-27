import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet,StatusBar } from 'react-native';
import Constants from 'expo-constants';

const favoriteFoods = [
  {
    id: 1,
    name: 'Tacos',
    description: 'A dikei le gustan los tacos',
    image: require('../img/tacos.png'),
  },
  {
    id: 2,
    name: 'Pupusas',
    description: 'Pupitas',
    image: require('../img/pupas.png'),
  },
  {
    id: 3,
    name: 'Costilla BBQ',
    description: 'Costilla',
    image: require('../img/costilla.png'),
  },
  {
    id: 4,
    name: 'Ramen',
    description: 'Sopa con verduras',
    image: require('../img/ramen.png'),
  },
  {
    id: 5,
    name: 'Penne Pasta',
    description: 'Le gusta a dikei',
    image: require('../img/pennePasta.png'),
  },
  {
    id: 6,
    name: 'Arroz',
    description: 'Arroz',
    image: require('../img/arroz.png'),
  },
];
const statusBarHeight = Constants.statusBarHeight || StatusBar.currentHeight || 0;

const FavoriteFoodsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {favoriteFoods.map(food => (
        <View key={food.id} style={styles.foodContainer}>
          <Image source={food.image} style={styles.foodImage} />
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.foodDescription}>{food.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:statusBarHeight,
    paddingHorizontal:10,
    backgroundColor: '#fff',
  },
  foodContainer: {
    marginBottom: 20,
  },
  foodImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  foodDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default FavoriteFoodsScreen;
