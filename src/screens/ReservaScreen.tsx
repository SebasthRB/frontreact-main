import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Cusco from 'C:/Users/SEBASTHIAN/OneDrive/Desktop/PROYECTO/frontreact-main/src/img/cusco.jpg';
import anfitrion from 'C:/Users/SEBASTHIAN/OneDrive/Desktop/PROYECTO/frontreact-main/src/img/anfitrion.png';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      {/* Imagen Principal */}
      <Image
        style={styles.mainImage}
        source={Cusco} // Se reemplaza la imagen con la ruta local
      />

      {/* Botón Circular en la parte superior derecha */}
      <TouchableOpacity style={styles.circularButton}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Información General */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Linda cabaña rústica en Mala</Text>
          <Text style={styles.subtitle}>Cusco </Text>
          <Text style={styles.details}>Duración: 4 días y 3 noches{"\n"}
            Incluye: Transporte, alojamiento, entradas a sitios arqueológicos, guía bilingüe y comidas indicadas en el itinerario.{"\n"}
            Actividades: Tours guiados por Cusco, Valle Sagrado y Machu Picchu.{"\n"}
            Grupo: Máximo 15 personas, para una experiencia personalizada.{"\n"}</Text>

          {/* Calificación y Opiniones */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.93 ★★★★★{"\n"}</Text>
            <Text style={styles.favoriteText}>Favorito entre huéspedes{"\n"}</Text>
            <Text style={styles.reviewText}>41 Evaluaciones{"\n"}</Text>
          </View>

          {/* Información del Anfitrión */}
          <View style={styles.hostInfo}>
            <Image
              style={styles.hostImage}
              source={anfitrion} // Imagen del anfitrión
            />
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>Anfitrión: Sebastian Basualdo</Text>
              <Text style={styles.hostSubtitle}>SuperAnfitrión · 4 años de experiencia</Text>
            </View>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            El Santuario Histórico de Machupicchu​ es un área protegida del Perú de más de 35 mil hectáreas que comprende
            el entorno natural del sitio arqueológico de Machupicchu, enclavados en la abrupta selva nubosa de las yungas
            en la vertiente oriental de los Andes peruanos y a ambas márgenes del río Urubamba, que corre en esta sección 
            con dirección noroeste.
          </Text>
          <TouchableOpacity>
            <Text style={styles.moreText}>Mostrar más ></Text>
          </TouchableOpacity>
        </View>

        {/* Botón para Reservar o Contactar */}
        <View style={styles.bottomContainer}>
          <Text style={styles.priceText}>$64 noche</Text>
          <Text style={styles.dateText}>18–23 de nov.</Text>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 250,
  },
  circularButton: {
    position: 'absolute',
    top: 15,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Color negro translúcido
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000', // Color negro para la "X"
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  scrollContent: {
    padding: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  details: {
    fontSize: 14,
    color: '#777',
  },
  ratingContainer: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  favoriteText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  hostImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  hostDetails: {
    marginLeft: 10,
  },
  hostName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hostSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
  },
  moreText: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#777',
  },
  reserveButton: {
    backgroundColor: '#ff5a5f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});