import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa la imagen local
import Huaytapallana from '../img/Huaytapallana.png';
import Cusco from '../img/cusco.jpg';
import Arequipa from '../img/arequipa.jpeg';
import anfitrion from '../img/anfitrion.png';
import { CommonActions } from '@react-navigation/native';

export default function ExploreScreen() {
  const navigation = useNavigation(); // Hook para la navegación

  // Función para cerrar sesión
  const handleSignOut = async () => {
    try {
      // Eliminar el token de sesión o los datos de autenticación
      await AsyncStorage.clear(); // Asegúrate de que el token esté guardado en 'user_token'
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Datos de los destinos
  const destinations = [
    {
      id: 1,
      image: Huaytapallana,
      title: 'Nevado de Huaytapallana',
      subtitle: 'Huaytapallana',
      distance: 'A 20 km de distancia',
      prevDescrip: 'Huaytapallana es una montaña en el Perú que pertenece a la cordillera de Huaytapallana, una prolongación de la cordillera Central, ramal montañoso de los Andes. ',
      description: 'La zona se caracteriza por sus seis lagunas: Ancapuachanan, Carhuacocha, Chuspicocha, Cocha Grande o Jatunccocha, Lazo Huntay y Pumacocha. Está protegida como parte del área de conservación regional Huaytapallana desde 2011. Se encuentra en el departamento de Junín, provincia de Huancayo.',
      price: 'S/.75',
      rating: 4.93,
      whatsappNumber: '+51989181858',
      duration: 'Duración: 1 día completo',
      includes: 'Incluye: Guía, transporte y refrigerio',
      activities: 'Actividades: Trekking, observación de fauna y flora',
      maxGroupSize: 10,
      hostName: 'Tony Ulloa',
      hostExperience: 'SuperAnfitrión · 4 años de experiencia',
      hostImage: anfitrion,
    },
    {
      id: 2,
      image: Cusco,
      title: 'Cusco, Perú',
      subtitle: 'Cusco',
      distance: 'A 340 km de distancia',
      prevDescrip: 'El Santuario Histórico de Machu Picchu se ubica en la provincia de Urubamba, Región Cusco.',
      description: 'Cusco, la antigua capital del Imperio Inca, es conocida por su asombroso legado arqueológico y su historia vibrante, atrayendo visitantes de todo el mundo. El Santuario Histórico de Machu Picchu se ubica en la provincia de Urubamba, Región Cusco. Comprende un extenso paisaje cultural y natural localizado en diversos ecosistemas, en el que también existen otros sitios arqueológicos conectados por caminos que conducen a la ciudad inca.',
      price: 'S/.100',
      rating: 4.89,
      whatsappNumber: '+51945503933',
      duration: 'Duración: 4 días y 3 noches',
      includes: 'Incluye: Transporte, alojamiento, entradas a sitios arqueológicos, guía bilingüe y comidas indicadas en el itinerario',
      activities: 'Actividades: Tours guiados por Cusco, Valle Sagrado y Machu Picchu',
      maxGroupSize: 15,
      hostName: 'Josue Lorenzo',
      hostExperience: 'SuperAnfitrión · 4 años de experiencia',
      hostImage: anfitrion,
    },
    {
      id: 3,
      image: Arequipa,
      title: 'Arequipa, Perú',
      subtitle: 'Arequipa',
      distance: 'A 250 km de distancia',
      prevDescrip: 'Arequipa es conocida como la Ciudad Blanca debido a su arquitectura construida con piedra volcánica blanca, llamada sillar',
      description: 'Arequipa es conocida como la Ciudad Blanca debido a su arquitectura construida con piedra volcánica blanca, llamada sillar. Sin embargo, muchas personas han pensado darle otro nombre, puesto que sus paisajes están rodeados por cuatro imponentes volcanes.',
      price: 'S/.85',
      rating: 4.75,
      whatsappNumber: '+51902242761',
      duration: 'Duración: 3 días y 2 noches',
      includes: 'Incluye: Alojamiento, tours locales y desayuno',
      activities: 'Actividades: Recorridos por el Centro Histórico, visita al Monasterio de Santa Catalina y miradores',
      maxGroupSize: 12,
      hostName: 'Sebastian Basualdo',
      hostExperience: 'SuperAnfitrión · 6 años de experiencia',
      hostImage: anfitrion,
    },
    {
      id: 4,
      image: Arequipa,
      title: 'Huancayo, Perú',
      subtitle: 'Arequipa',
      distance: 'A 250 km de distancia',
      prevDescrip: 'Arequipa es conocida como la Ciudad Blanca debido a su arquitectura construida con piedra volcánica blanca, llamada sillar',
      description: 'Arequipa es conocida como la Ciudad Blanca debido a su arquitectura construida con piedra volcánica blanca, llamada sillar. Sin embargo, muchas personas han pensado darle otro nombre, puesto que sus paisajes están rodeados por cuatro imponentes volcanes.',
      price: 'S/.85',
      rating: 4.75,
      whatsappNumber: '+51902242761',
      duration: 'Duración: 3 días y 2 noches',
      includes: 'Incluye: Alojamiento, tours locales y desayuno',
      activities: 'Actividades: Recorridos por el Centro Histórico, visita al Monasterio de Santa Catalina y miradores',
      maxGroupSize: 12,
      hostName: 'Sebastian Basualdo',
      hostExperience: 'SuperAnfitrión · 6 años de experiencia',
      hostImage: anfitrion,
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
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Cerrar sesión</Text>
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
              <Text style={styles.cardSubtitle}>{destination.prevDescrip}{"\n"}</Text>
              <Text style={styles.cardPrice}>{destination.price}</Text>
            </View>
            <TouchableOpacity 
              style={styles.mapButton} 
              onPress={() => navigation.navigate('ReservaScreen', {
                image: destination.image,
                title: destination.title,
                subtitle: destination.subtitle,
                whatsappNumber: destination.whatsappNumber,
                description: destination.description,
                price: destination.price,
                rating: destination.rating,
                duration: destination.duration,
                includes: destination.includes,
                activities: destination.activities,
                maxGroupSize: destination.maxGroupSize,
                hostName: destination.hostName,
                hostExperience: destination.hostExperience,
              })} // Navega a ReservaScreen
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
  signOutButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FF6347',
    borderRadius: 5,
    marginRight: 10,
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
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