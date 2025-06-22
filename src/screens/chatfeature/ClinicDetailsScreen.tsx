import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GOOGLE_API_KEY } from '@env';

type Params = {
  ClinicDetails: {
    place: any;
  };
};

export default function ClinicDetailsScreen() {
  const route = useRoute<RouteProp<Params, 'ClinicDetails'>>();
  const { place } = route.params;

  const lat = place.geometry.location.lat;
  const lng = place.geometry.location.lng;
  const photoReference = place.photos?.[0]?.photo_reference;
  const imageUrl = photoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`
    : null;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: lng }} title={place.name} />
      </MapView>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.address}>{place.vicinity}</Text>
        <Text style={styles.rating}>Rating: ⭐️ {place.rating || 'N/A'}</Text>

        <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
          <Ionicons name="navigate" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0077b6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
