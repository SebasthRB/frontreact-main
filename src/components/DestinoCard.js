// DestinoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import DESTINO_ID from '../graphql/obtenerDestinoId';

export default function DestinoCard({ destino, onPress }) {

    const { loading, error, data } = useQuery(DESTINO_ID, {
        variables: { obtenerDestinoPorIdId: destino._id }, // Usar el _id del destino
      });
      if (error) {
        return (
          <View style={styles.destinationCard}>
            <Text style={styles.errorText}>Error al cargar los detalles</Text>
          </View>
        );
      }

      const destinoDetails = data ? data.obtenerDestinoPorId : destino;
      return (
        <View style={styles.destinationCard}>
          <Text style={styles.destinationName}>{destinoDetails.nombre}</Text>
          <Text style={styles.destinationDescription}>{destinoDetails.descripcion}</Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => onPress(destinoDetails)} // Pasamos los detalles completos
          >
            <Text style={styles.detailsButtonText}>Ver más</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  destinationCard: {
    width: 180,
    height: 200,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  destinationDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#3498db',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
