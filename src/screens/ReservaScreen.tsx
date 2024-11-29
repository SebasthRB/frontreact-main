import React,  { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import anfitrion from '../img/anfitrion.png';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ContactScreen() {

  const navigation = useNavigation(); // Obtener acceso a la navegación
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  const handleGoBack = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true); // Deshabilitar el botón al hacer clic
      setTimeout(() => {
        navigation.goBack(); // Regresar al menú después de 1 segundo
      }, 100); // Retraso de 1 segundo para evitar múltiples clics
    }
  };

  const route = useRoute();
  const { 
    foto,
    destino,
    subtitle,
    whatsappNumber,
    description,
    price,
    rating,
    duration,
    includes,
    activities,
    maxGroupSize,
    hostName,
    hostExperience,
  } = route.params;

  const [reviews, setReviews] = useState(0);
  
  useEffect(() => {
    const randomReviews = Math.floor(Math.random() * 91) + 10; // Genera un número entre 10 y 100
    setReviews(randomReviews);
  }, []);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleWhatsAppPress = () => {

    const message = `Hola, me gustaría reservar un tour para "${destino}". ¿Podrías darme más información?`;
    const whatsappURL = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    // Intentar abrir el enlace de WhatsApp
    Linking.openURL(whatsappURL).catch((err) => {
      console.error("No se pudo abrir WhatsApp", err);
    });
  };

  return (
    <View style={styles.container}>
      {/* Imagen Principal */}
      <Image
        style={styles.mainImage}
        source={foto} // Se reemplaza la imagen con la ruta local
      />

      {/* Botón Circular en la parte superior derecha */}
      <TouchableOpacity 
        style={styles.circularButton} 
        onPress={handleGoBack} // Volver al menú
        disabled={isButtonDisabled} // Deshabilitar el botón si está en proceso
      >
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Información General */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{destino}</Text>
          <Text style={styles.subtitle}>{subtitle} </Text>
          <Text style={styles.details}>{duration}</Text>
          <Text style={styles.details}>{includes}</Text>
          <Text style={styles.details}>{activities}</Text>
          <Text style={styles.details}>Grupo máximo: {maxGroupSize} personas</Text>

          {/* Calificación y Opiniones */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Calificación: {rating} ★★★★{"\n"}</Text>
            <Text style={styles.favoriteText}>Favorito entre huéspedes{"\n"}</Text>
            <Text style={styles.reviewText}>{reviews} Evaluaciones{"\n"}</Text>
          </View>

          {/* Información del Anfitrión */}
          <View style={styles.hostInfo}>
            <Image
              style={styles.hostImage}
              source={anfitrion} // Imagen del anfitrión
            />
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>{hostName}</Text>
              <Text style={styles.hostSubtitle}>{hostExperience}</Text>
            </View>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {showFullDescription ? description : (description ? `${description.substring(0, 200)}...` : '')}
          </Text>
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.moreText}>{showFullDescription ? 'Mostrar menos' : 'Mostrar más >'}</Text>
          </TouchableOpacity>
        </View>

        {/* Botón para Reservar o Contactar */}
        <View style={styles.bottomContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.priceText}>{"S/."}{price} noche</Text>
            <Text style={styles.dateText}>18–23 de nov.{"\n"}</Text>
            <Text style={styles.hostReserv}>Reserva tu Tour a {"\n"}{destino}{"\n"}</Text>
            <Text style={styles.hostReserv}>{"\n"}</Text>
          </View>
          <TouchableOpacity style={styles.reserveButton} onPress={handleWhatsAppPress}>
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
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)', // Color negro translúcido
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000', // Color negro para la "X"
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  scrollContent: {
    padding: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
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
  hostReserv: {
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