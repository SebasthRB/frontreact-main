import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importa la imagen local
import Huaytapallana from 'C:/Users/SEBASTHIAN/OneDrive/Desktop/PROYECTO/frontreact-main/src/img/Huaytapallana.png';
import Cusco from 'C:/Users/SEBASTHIAN/OneDrive/Desktop/PROYECTO/frontreact-main/src/img/cusco.jpg';
import Arequipa from 'C:/Users/SEBASTHIAN/OneDrive/Desktop/PROYECTO/frontreact-main/src/img/arequipa.jpeg';

export default function ExploreScreen() {
  const navigation = useNavigation(); // Hook para la navegación

  // Datos de los destinos
  const destinations = [
    {
      id: 1,
      image: Huaytapallana,
      title: 'Nevado de Huaytapallana',
      distance: 'A 20 km de distancia',
      description: 'La zona se caracteriza por sus seis lagunas: Ancapuachanan, Carhuacocha, Chuspicocha, Cocha Grande o Jatunccocha, Lazo Huntay y Pumacocha.',
      price: 'S/.75',
      rating: 4.93,
    },
    {
      id: 2,
      image: Cusco,
      title: 'Cusco, Perú',
      distance: 'A 340 km de distancia',
      description: 'Ciudad histórica con maravillas arqueológicas.',
      price: '$100 noche',
      rating: 4.89,
    },
    {
      id: 3,
      image: Arequipa,
      title: 'Arequipa, Perú',
      distance: 'A 250 km de distancia',
      description: 'Conocida por su arquitectura colonial.',
      price: '$85 noche',
      rating: 4.75,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="¿A dónde quieres ir?"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterIconContainer}>
          <Text style={styles.filterIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido desplazable */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Navegación de categorías con scroll horizontal */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Casas de campo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Icónicos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Habitaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Albercas increíbles</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Cards de alojamientos con datos de destinos */}
        {destinations.map((destination) => (
          <View key={destination.id} style={styles.card}>
            <Image style={styles.cardImage} source={destination.image} />
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>🖤</Text>
            </TouchableOpacity>
            <View style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>{destination.title}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>★ {destination.rating}</Text>
                </View>
              </View>
              <Text style={styles.cardSubtitle}>{destination.distance}</Text>
              <Text style={styles.cardSubtitle}>{destination.description}</Text>
              <Text style={styles.cardPrice}>{destination.price}</Text>
            </View>
            <TouchableOpacity 
              style={styles.mapButton} 
              onPress={() => navigation.navigate('ReservaScreen')} // Navega a ReservaScreen
            >
              <Text style={styles.mapButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navItem}>Explora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navItem}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navItem}>Viajes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navItem}>Mensajes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navItem}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 70, // Espacio para la barra de búsqueda fija
    paddingBottom: 80, // Espacio para la barra de navegación fija
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  searchIconContainer: {
    padding: 5,
    marginLeft: 5,
  },
  filterIconContainer: {
    padding: 5,
    marginLeft: 5,
  },
  searchIcon: {
    fontSize: 20,
  },
  filterIcon: {
    fontSize: 20,
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  categoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#000', // Color rojo para el ícono de favorito
  },
  cardContent: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  cardPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  navButton: {
    alignItems: 'center',
    padding: 10,
  },
  navItem: {
    fontSize: 14,
    color: '#555',
  },
});