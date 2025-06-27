import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE_API_KEY } from '@env';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDistance } from 'geolib';

type RootStackParamList = {
  NearbyTherapistScreen: undefined;
  ClinicDetails: { place: any }; // Replace `any` with proper type if you have one
};

type NearbyTherapistScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NearbyTherapistScreen'
>;

export default function NearbyTherapistScreen() {
  const navigation = useNavigation<NearbyTherapistScreenNavigationProp>();

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('physiotherapy');
  const [radius, setRadius] = useState(20); // default 20 km
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchPlaces = async () => {
    if (!location) return;

    try {
      const radiusInMeters = radius * 1000;
      const keyword = `${searchKeyword} OR hospital OR rehab`;

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radiusInMeters}&keyword=${encodeURIComponent(
        keyword
      )}&key=${GOOGLE_API_KEY}`;

      const res = await axios.get(url);

      if (res.data.status === 'OK') {
        const withDistance = res.data.results.map((place: any) => ({
          ...place,
          distance:
            getDistance(
              { latitude: location.latitude, longitude: location.longitude },
              {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }
            ) / 1000, // meters to km
        }));
        setPlaces(withDistance);
      } else {
        console.warn('No results:', res.data.status, res.data.error_message);
        setPlaces([]);
      }
    } catch (err) {
      console.error('Google Places API error:', err);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) fetchPlaces();
  }, [location, radius]);

  const handleSearch = () => fetchPlaces();

  const renderItem = ({ item }: { item: any }) => {
    const photoReference = item.photos?.[0]?.photo_reference;
    const photoUrl = photoReference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`
      : null;

    return (
      <View style={styles.card}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.placeImage} />
        ) : (
          <Ionicons name="location-sharp" size={50} color="#0077b6" style={styles.placeImage} />
        )}

        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={styles.placeName}>{item.name}</Text>
          <Text>Rating: ⭐️ {item.rating ? item.rating.toFixed(1) : 'N/A'}</Text>
          <Text>Distance: {item.distance ? item.distance.toFixed(2) : '?'} km</Text>
        </View>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('ClinicDetails', { place: item })}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search clinics, therapists, hospitals..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Search Radius: {radius} km</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={5}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="#0077b6"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#f9a825"
          value={radius}
          onValueChange={setRadius}
        />
      </View>

      <Text style={styles.resultLabel}>Nearby Results</Text>

      <FlatList
        data={places}
        keyExtractor={(item, idx) => item.place_id || idx.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sliderContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  placeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailsButton: {
    backgroundColor: '#0077b6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
