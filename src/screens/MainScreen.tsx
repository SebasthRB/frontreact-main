import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import axios from 'axios';

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

  // Estado para almacenar los destinos obtenidos desde la API
  const [paquete, setPaquetes] = useState([]);
  const [destino, setDestinos] = useState([]);
  const [agencia, setAgencias] = useState([]);
  const [localImages, setLocalImages] = useState<Record<string, string>>({}); // Estado para imágenes descargadas

  useEffect(() => {
    fetchPaquetes();
    fetchDestinos();
    fetchAgencias();

  }, []);

  const fetchPaquetes = () => {
    // La consulta GraphQL
    const query = `
      query {
        paquetes {
          nombre
          descripcion
          precio
          duracion
          destino
          incluye
          grupo
          calificacion
          foto
          agencia_id
          telefono
        }
      }
    `;

    axios
      .post('http://192.168.40.223:4000/', {
        query: query,
      })
      .then((response) => {
        const paquetesData = response.data.data.paquetes;
        setPaquetes(paquetesData);
        downloadImages(paquetesData);
      })
        .catch((error) => {
        console.error('Error al obtener paquetes:', error);
      });
  };
  
  const fetchDestinos = () => {
    // La consulta GraphQL
    const query = `
      query {
        destinos {
          nombre
          descripcion
          puntos_interes
          actividades
          clima
          mejor_epoca
        }
      }
    `;
    axios
    .post('http://192.168.40.223:4000/', {
      query: query,
    })
    .then((response) => {
      const destinosData = response.data.data.destinos;
      setDestinos(destinosData);
    })
      .catch((error) => {
      console.error('Error al obtener destinos:', error);
    });
  };
  
  const fetchAgencias = () => {
    // La consulta GraphQL
    const query = `
      query {
        agencias {
          nombre
          contacto
          telefono
          email
          direccion
        }
      }
    `;
    axios
    .post('http://192.168.40.223:4000/', {
      query: query,
    })
    .then((response) => {
      const agenciasData = response.data.data.agencias;
      setAgencias(agenciasData);
    })
      .catch((error) => {
      console.error('Error al obtener agencias:', error);
    });
  };

  type Paquete = {
    nombre: string;
    foto: string;
  };

  type DownloadedImages = Record<string, string>; // Mapeo del nombre del paquete a la ruta local de la imagen

  const downloadImages = async (paquetes: Paquete[]): Promise<void> => {
  const downloadedImages: DownloadedImages = {}; // Declara el tipo explícito
  const imgDirectory = `${RNFS.DocumentDirectoryPath}/img`; // Ruta local para guardar imágenes

  try {
    // Crea el directorio "img" si no existe
    const dirExists = await RNFS.exists(imgDirectory);
    if (!dirExists) {
      await RNFS.mkdir(imgDirectory);
    }

    for (const paquete of paquetes) {
      const imageUrl = paquete.foto;
      const fileName = imageUrl.split('/').pop(); // Obtén el nombre del archivo desde la URL
      const localPath = `${imgDirectory}/${fileName}`; // Guarda las imágenes en la carpeta "img"

      // Verifica si la imagen ya fue descargada
      const fileExists = await RNFS.exists(localPath);
      if (!fileExists) {
        await RNFS.downloadFile({ fromUrl: imageUrl, toFile: localPath }).promise;
      }

      // Asigna la ruta local de la imagen al objeto
      downloadedImages[paquete.nombre] = `file://${localPath}`;
    }

    setLocalImages(downloadedImages); // Actualiza el estado con las rutas locales
  } catch (error) {
    console.error('Error al descargar o guardar imágenes:', error);
  }
};

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
        {paquete.length > 0 ? (
          paquete.map((paquete, i) => (
          <View key={i} style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: localImages[paquete.nombre] || paquete.foto }} />
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>🖤</Text>
            </TouchableOpacity>
            <View style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>{paquete.nombre}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>★ {paquete.calificacion}</Text>
                </View>
              </View>
              <Text style={styles.cardSubtitle}>{"\n"}{paquete.destino}{"\n"}</Text>
              <Text style={styles.cardSubtitle}>{paquete.descripcion}{"\n"}</Text>
              <Text style={styles.cardPrice}>{"S/."}{paquete.precio}</Text>
            </View>
            <TouchableOpacity 
              style={styles.mapButton} 
              onPress={() => navigation.navigate('ReservaScreen', {
                foto: { uri: localImages[paquete.nombre] || paquete.foto },
                destino: destino.nombre,
                subtitle: paquete.destino,
                whatsappNumber: paquete.telefono,
                description: paquete.descripcion,
                price: paquete.precio,
                rating: paquete.calificacion,
                duration: paquete.duracion,
                includes: paquete.incluye,
                interes: destino.puntos_interes,
                activities: destino.actividades,
                maxGroupSize: paquete.grupo,
                hostName: agencia.nombre,
                hostExperience: agencia.contacto,
              })} // Navega a ReservaScreen
            >
              <Text style={styles.mapButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Cargando destinos...</Text>
      )}
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
    fontSize: 24,
    color: 'black',
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