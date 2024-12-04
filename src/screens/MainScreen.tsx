import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import { useQuery } from '@apollo/client';
import { GET_PAQUETES } from '../graphql/obtenerPaquetes';

export default function ExploreScreen() {
  const navigation = useNavigation(); // Hook para la navegación

  // Función para cerrar sesión
  const handleSignOut = async () => {
    try {
      // Eliminar el token de sesión o los datos de autenticación
      await AsyncStorage.clear();
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

  const { loading, error, data } = useQuery(GET_PAQUETES);

  if (loading) return <Text>Cargando...</Text>;

  if (error) {
    console.error('Error al cargar paquetes:', error);
    return <Text>Error al cargar paquetes: {error.message}</Text>;
  }

  if (!data.paquetes) {
    return <Text>No se encontraron paquetes</Text>;
  }

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

        {/* Renderizar destinos */}
        <View style={styles.paquetesContainer}>
          {data.paquetes.map((paquete) => (
            <View key={paquete._id} style={styles.card}>
              {/* Mostrar la imagen solo si existe en el sistema de archivos */}
              <Image
                source={{ uri: paquete.foto }} // Usar la ruta completa de la imagen
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{paquete.nombre}</Text>

                {/* Mostrar la agencia */}
                <Text style={styles.cardAgency}>Publicado por: {paquete.agencia.nombre}</Text>

                {/* Mostrar la calificación en estrellas */}
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Text key={index} style={styles.star}>
                      {index < Math.floor(paquete.calificacion) ? '★' : '☆'}
                    </Text>
                  ))}
                </View>

                <Text style={styles.cardSubtitle}>{paquete.descripcion}</Text>
                <Text style={styles.cardPrice}>Precio: ${paquete.precio}</Text>
                <Text style={styles.cardDuration}>Duración: {paquete.duracion} días</Text>

                <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => navigation.navigate('ReservaScreen', {
                  paquete: paquete   })}>
                <Text style={styles.mapButtonText}>Ver más</Text>
              </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
    height: 200, // Puedes ajustar la altura según el diseño
    borderTopLeftRadius: 8, // Redondea las esquinas superiores
    borderTopRightRadius: 8, // Redondea las esquinas superiores
    overflow: 'hidden', // Asegura que la imagen no se desborde
    marginBottom: 10, // Espacio entre la imagen y el contenido
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 24,
    color: 'black',
  },
  cardAgency: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 18,
    color: '#FFD700', // Color dorado para las estrellas
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  cardPrice: {
    fontSize: 16,
    color: '#28a745',
    marginTop: 5,
  },
  cardDuration: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 5,
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
