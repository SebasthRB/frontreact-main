// PaqueteDetalleScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import DestinoCard from '../components/DestinoCard';  // Importamos el componente DestinoCard

export default function PaqueteDetalleScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { paquete } = route.params;

  const imageOpacity = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDestinationPress = (destination) => {
    // Navegar a la pantalla de detalles del destino
    navigation.navigate('DestinoDetalleScreen', { destino: destination });
  };

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={{ uri: paquete.foto }} 
        style={[styles.mainImage, { opacity: imageOpacity }]} 
        resizeMode="cover"
      />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.packageTitle}>{paquete.nombre}</Text>
          <Text style={styles.packageSubtitle}>{paquete.descripcion}</Text>
          <Text style={styles.price}>Precio: ${paquete.precio}</Text>
          <Text style={styles.duration}>Duración: {paquete.duracion} días</Text>
          <Text style={styles.detailsText}>Agencia: {paquete.agencia.nombre}</Text>
          <Text style={styles.detailsText}>Dirección: {paquete.agencia.direccion}</Text>
          <Text style={styles.detailsText}>Telefono: {paquete.agencia.telefono}</Text>
          <Text style={styles.detailsText}>Calificación: {paquete.calificacion} ★</Text>

          <Text style={styles.destinationsTitle}>Destinos de la Ruta</Text>
          
          <FlatList
            data={paquete.destinos}
            horizontal
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <DestinoCard 
                destino={item} 
                onPress={handleDestinationPress} 
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
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
  mainImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    fontSize: 20,
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
  },
  packageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  packageSubtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: 10 },
  duration: {
    fontSize: 18,
    color: '#3498db',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 0,
  },
  destinationsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 20,
  },
  contactContainer: {
    padding: 20,
    position: 'static',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  contactButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
