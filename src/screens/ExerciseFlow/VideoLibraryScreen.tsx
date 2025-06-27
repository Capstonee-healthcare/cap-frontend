import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { fetchExercisesByBodyPart } from '../../api/exerciseApi';
import { testExerciseAPI } from '../../api/testExerciseApi';
import AppHeader from '../../components/AppHeader';

type Exercise = {
  id: string;
  name: string;
  target: string;
  gifUrl: string;
  bodyPart: string;
  equipment: string;
};

// Use the existing icons from your assets folder
const bodyParts = [
  { name: 'shoulders', label: 'Shoulder', icon: require('../../../assets/icons/shoulder.png') },
  { name: 'back', label: 'Back', icon: require('../../../assets/icons/back-pain.png') },
  { name: 'lower arms', label: 'Elbow', icon: require('../../../assets/icons/elbow.png') },
  { name: 'upper legs', label: 'Knee', icon: require('../../../assets/icons/knee.png') },
];

const VideoLibraryScreen = () => {
  const [selectedPart, setSelectedPart] = useState('shoulders');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Test API access first
    testExerciseAPI().then(success => {
      if (success) {
        console.log('✅ API test passed, fetching exercises...');
      } else {
        console.log('❌ API test failed, will use fallback data');
      }
    });
    
    getExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPart]);

  const getExercises = async () => {
    setIsLoading(true);
    setError('');
    setExercises([]); // Clear previous exercises
    try {
      const result = await fetchExercisesByBodyPart(selectedPart);
      if (result.length === 0) {
        setError('No exercises found for this body part. The API might be having issues.');
      } else {
        setExercises(result);
      }
    } catch (err) {
      setError('Failed to fetch exercises. Please check your internet connection.');
      console.error('Error in getExercises:', err);
    }
    setIsLoading(false);
  };

  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => navigation.navigate('VideoExerciseDetail', { item })}
    >
      <Image source={{ uri: item.gifUrl }} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.exerciseSub}>Target: {item.target}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <AppHeader type="subtle" title="Video Library" showBell />

      {/* Category Scroll */}
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>Select category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {bodyParts.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.categoryItem}
              onPress={() => setSelectedPart(item.name)}
            >
              <View style={[styles.categoryIconCircle, selectedPart === item.name && styles.categoryIconSelected]}>
                <Image source={item.icon} style={styles.categoryIcon} />
              </View>
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Exercises List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Videos</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#4DD0E1" style={{ marginTop: hp('10%')}} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={getExercises}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: hp('5%') }}
            renderItem={renderExerciseCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default VideoLibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  sectionTitle: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('1.5%'),
  },
  categoryScroll: {
    paddingBottom: hp('1%'),
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: wp('5%'),
  },
  categoryIconCircle: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
    borderWidth: 2,
    borderColor: 'transparent'
  },
  categoryIconSelected: {
    borderColor: '#4DD0E1',
  },
  categoryIcon: {
    width: wp('9%'),
    height: wp('9%'),
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: hp('1.8%'),
    color: '#555',
  },
  listSection: {
    flex: 1,
    marginTop: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    marginBottom: hp('1.5%'),
    padding: wp('3%'),
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  exerciseImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 10,
    marginRight: wp('4%'),
    backgroundColor: '#e0e0e0',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#333',
  },
  exerciseSub: {
    fontSize: hp('1.8%'),
    color: '#777',
    marginTop: hp('0.5%'),
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('10%'),
    paddingHorizontal: wp('10%'),
  },
  errorText: {
    fontSize: hp('2%'),
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  retryButton: {
    backgroundColor: '#4DD0E1',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 25,
  },
  retryText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});
