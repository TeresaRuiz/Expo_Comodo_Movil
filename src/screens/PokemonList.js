import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import FormularioPokemon from '../components/FormularioPokemon';

const WIDTH = Dimensions.get('window').width;

export default function PokemonList() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nombrePokemon, setNombrePokemon] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!nombrePokemon) {
          return; // Evita hacer una solicitud vacía
        }
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('No se encontró el Pokemon');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.log("Error al obtener el Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nombrePokemon]);

  return (
    <View style={styles.container}>
      <FormularioPokemon
        tituloFormulario='Buscar Pokemon'
        labelInput='Ingrese el nombre del Pokemon: '
        placeHolderInput='Nombre del Pokemon'
        valor={nombrePokemon}
        setValor={setNombrePokemon}
      />
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : pokemon ? (
        <View style={styles.card}>
          <Text style={styles.title}>{pokemon.name}</Text>
          <Text>ID: {pokemon.id}</Text>
          <Text>Altura: {pokemon.height}</Text>
          <Text>Peso: {pokemon.weight}</Text>
          <Text>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</Text>
        </View>
      ) : (
        <Text>No se encontró el Pokemon</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 20,
    width: WIDTH - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  loading: {
    marginTop: 20,
  },
});
