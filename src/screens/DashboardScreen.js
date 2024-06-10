import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const categories = [
    { title: 'Bars & Hotels', places: 42, icon: 'beer-outline' },
    { title: 'Fine Dining', places: 15, icon: 'restaurant-outline' },
    { title: 'Cafes', places: 28, icon: 'cafe-outline' },
    { title: 'Nearby', places: 34, icon: 'location-outline', highlighted: true },
    { title: 'Fast Foods', places: 29, icon: 'fast-food-outline' },
    { title: 'Featured Foods', places: 21, icon: 'pizza-outline' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Discovery</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <View key={index} style={[styles.card, category.highlighted && styles.highlightedCard]}>
            <Ionicons name={category.icon} size={40} color={category.highlighted ? '#fff' : '#000'} />
            <Text style={[styles.cardTitle, category.highlighted && styles.highlightedCardTitle]}>{category.title}</Text>
            <Text style={[styles.cardContent, category.highlighted && styles.highlightedCardContent]}>{category.places} Places</Text>
          </View>
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
  highlightedCard: {
    backgroundColor: '#ff9800', // bright orange color for highlighted card
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#333', // dark grey color for card titles
  },
  highlightedCardTitle: {
    color: '#fff', // white color for highlighted card titles
  },
  cardContent: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color: '#666', // medium grey color for card content
  },
  highlightedCardContent: {
    color: '#fff', // white color for highlighted card content
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default DashboardScreen;