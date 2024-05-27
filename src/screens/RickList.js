import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 2;

import PokemonItem from '../components/RickItem';
import FormularioPokemon from '../components/FormRick';

export default function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nombreP, setNombreP] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const API = nombreP === ''
                ? 'https://rickandmortyapi.com/api/character'
                : `https://rickandmortyapi.com/api/character/?name=${nombreP}`;

            console.log(API);
            const response = await fetch(API);
            const data = await response.json();
            setPokemon(data.results);
        } catch (error) {
            console.log("Hubo un error listando de rick y morty", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [nombreP]);

    return (
        <View style={styles.container}>
            <FormularioPokemon
                tituloFormulario='Listado de personajes usando Fetch'
                labelInput='Ingrese el nombre del personaje: '
                placeHolderInput='Rick'
                valor={nombreP}
                setValor={setNombreP}
            />
            {loading ? (
                <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={pokemon}
                    renderItem={({ item }) => <PokemonItem item={item} />}
                    keyExtractor={(item) => item.id.toString()} // Utiliza el ID como clave única
                    numColumns={numColumns}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    list: {
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        margin: 5,
        width: WIDTH / numColumns - 10,
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        textTransform: 'capitalize',
    },
    image: {
        width: 80,
        height: 80,
    },
    loading: {
        marginTop: 20,
    },
});
