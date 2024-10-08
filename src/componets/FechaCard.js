import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/HistorialScreenStyles';
import CardHistorial from '././Cards/CardHistorial';

const FechaCard = ({ fecha, pedidos }) => {
    const [expanded, setExpanded] = useState(true); // Inicializa como false para que empiece colapsado

    const totalPedidos = pedidos.length;
    const totalGastado = pedidos.reduce((sum, pedido) => 
        sum + (pedido.cantidad * pedido.precio_unitario), 0);

    return (
        <TouchableOpacity 
            style={styles.fechaCardContainer}
            onPress={() => setExpanded(!expanded)} // Alterna el estado expanded
            activeOpacity={0.7}
        >
            <View style={styles.fechaCardHeader}>
                <View style={styles.fechaCardInfo}>
                    <Text style={styles.fechaCardTitle}>{fecha}</Text>
                    <Text style={styles.fechaCardSubtitle}>
                        {totalPedidos} {totalPedidos === 1 ? 'pedido' : 'pedidos'} - Total: ${totalGastado.toFixed(2)}
                    </Text>
                </View>
                <Ionicons 
                    name={expanded ? 'chevron-up' : 'chevron-down'} 
                    size={24} 
                    color="#3046BC"
                />
            </View>
            
            {expanded && (
                <View style={styles.fechaCardContent}>
                    {pedidos.map((pedido) => (
                        <CardHistorial
                            key={pedido.id_detalle_reserva.toString()}
                            item={pedido}
                        />
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default FechaCard;
