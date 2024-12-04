// DestinoDetalleScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DestinoDetalleScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { destino } = route.params;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://estaticos-cdn.prensaiberica.es/clip/5bfa0140-7ff8-4f61-b77b-4be7cf0a5de0_woman-libre-1200_default_0.jpg' }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.destinationTitle}>{destino.nombre}</Text>
          <Text style={styles.destinationDescription}>{destino.descripcion}</Text>
          <Text style={styles.destinationInfo}>Puntos de Interés: {destino.puntos_interes.join(', ')}</Text>
          <Text style={styles.destinationInfo}>Actividades: {destino.actividades.join(', ')}</Text>
          <Text style={styles.destinationInfo}>Clima: {destino.clima}</Text>
          <Text style={styles.destinationInfo}>Mejor Época: {destino.mejor_epoca}</Text>
          <Text style={styles.destinationInfo}>Agencia: {destino.agencia.nombre}</Text>
          <Text style={styles.destinationInfo}>Fecha de Creación: {new Date(destino.fecha_creacion).toLocaleDateString()}</Text>
        </View>
      </ScrollView>

      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Reservar ahora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 0,
    padding: 20,
  },
  detailsContainer: {
    paddingBottom: 60,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
  },
  destinationTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 15,
  },
  destinationDescription: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 20,
  },
  destinationInfo: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  contactContainer: {
    padding: 20,
    position: 'static',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e74c3c',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 0,
  },
  contactButton: {
    backgroundColor: '#c0392b',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});