import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import * as Constantes from '../utils/constantes';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/HistorialScreenStyles';
import FechaCard from '../componets/FechaCard';

const HistorialScreen = ({ navigation }) => {
    const [historialAgrupado, setHistorialAgrupado] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const ip = Constantes.IP;

    const agruparHistorialPorFecha = (historial) => {
        const grupos = historial.reduce((acc, pedido) => {
            const fecha = pedido.fecha_reserva.split(' ')[0];
            if (!acc[fecha]) {
                acc[fecha] = [];
            }
            acc[fecha].push(pedido);
            return acc;
        }, {});

        // Convertir el objeto en un array y ordenar por fecha
        return Object.entries(grupos)
            .map(([fecha, pedidos]) => ({
                fecha,
                pedidos
            }))
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    };

    const fetchHistorial = useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await fetch(`${ip}/Expo_Comodo/api/services/public/pedido.php?action=readHistorials`);
            const data = await response.json();
            if (data.status) {
                const historialOrdenado = agruparHistorialPorFecha(data.dataset);
                setHistorialAgrupado(historialOrdenado);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del historial');
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    }, [ip]);

    const onRefresh = useCallback(() => {
        fetchHistorial();
    }, [fetchHistorial]);

    useEffect(() => {
        fetchHistorial();
    }, [fetchHistorial]);

    const renderFechaCard = ({ item }) => (
        <FechaCard fecha={item.fecha} pedidos={item.pedidos} />
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Historial de pedidos</Text>

            <FlatList
                data={historialAgrupado}
                renderItem={renderFechaCard}
                keyExtractor={item => item.fecha}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

export default HistorialScreen;