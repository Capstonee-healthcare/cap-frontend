import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import AppHeader from '../../components/AppHeader';

type Exercise = {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
};

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

const ExerciseDetailScreen = () => {
  const route = useRoute<any>();
  const { item }: { item: Exercise } = route.params;
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const InfoPill = ({ icon, text }: {icon: React.ReactNode, text: string}) => (
      <View style={styles.infoPill}>
        {icon}
        <Text style={styles.infoPillText}>{text}</Text>
      </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <AppHeader type="sub" title={item.name} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Difficulty Selector */}
          <View style={styles.difficultyContainer}>
             <Text style={styles.sectionTitle}>Difficulty level</Text>
             <View style={styles.difficultyTabs}>
                {(['Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map(level => (
                    <TouchableOpacity 
                        key={level} 
                        style={[styles.difficultyTab, difficulty === level && styles.difficultyTabActive]}
                        onPress={() => setDifficulty(level)}
                    >
                        <Text style={[styles.difficultyText, difficulty === level && styles.difficultyTextActive]}>{level}</Text>
                    </TouchableOpacity>
                ))}
             </View>
          </View>

          {/* GIF Player */}
          <View style={styles.gifContainer}>
            <Image source={{ uri: item.gifUrl }} style={styles.gif} />
            <View style={styles.playButton}>
              <Ionicons name="play" size={wp('8%')} color="#333" />
            </View>
          </View>
          
          {/* Progress and Bookmark */}
          <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
              </View>
              <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
                  <Ionicons 
                    name={isBookmarked ? "bookmark" : "bookmark-outline"} 
                    size={wp('6%')} 
                    color={isBookmarked ? '#4DD0E1' : '#E0E0E0'} 
                  />
              </TouchableOpacity>
          </View>

          {/* Info Pills */}
           <View style={styles.infoPillsContainer}>
                <InfoPill icon={<Ionicons name="time-outline" size={wp('5%')} color="#555" />} text="15 min" />
                <InfoPill icon={<Ionicons name="barbell-outline" size={wp('5%')} color="#555" />} text="Mobility" />
           </View>
           
           {/* Description */}
           <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                    This exercise helps to improve strength and mobility in the {item.target}. Focus on slow and controlled movements. Great for recovery or flexibility training. Always consult a professional before starting a new exercise routine.
                </Text>
           </View>
           
           {/* Equipment */}
           <View style={styles.section}>
                <Text style={styles.sectionTitle}>Equipments Required</Text>
                <View style={styles.equipmentCard}>
                    <Ionicons name="fitness-outline" size={wp('10%')} color="#4DD0E1" />
                    <Text style={styles.equipmentText}>{item.equipment}</Text>
                </View>
           </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('5%'),
  },
  sectionTitle: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: '#333',
    marginTop: hp('3%'),
    marginBottom: hp('1.5%'),
  },
  difficultyContainer: {
    // You can add custom styles here if needed
  },
  difficultyTabs: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: wp('1%'),
  },
  difficultyTab: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    borderRadius: 50,
    alignItems: 'center',
  },
  difficultyTabActive: {
    backgroundColor: '#FFC107',
  },
  difficultyText: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    color: '#888',
  },
  difficultyTextActive: {
    color: '#fff',
  },
  gifContainer: {
    marginTop: hp('2%'),
    width: '100%',
    height: hp('30%'),
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  playButton: {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: wp('3%'),
      borderRadius: 50
  },
  progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('1.5%'),
  },
  progressBar: {
      flex: 1,
      height: hp('1%'),
      backgroundColor: '#E0E0E0',
      borderRadius: 10,
      marginRight: wp('4%'),
  },
  progressFill: {
      width: '33%', // Static for now
      height: '100%',
      backgroundColor: '#4DD0E1',
      borderRadius: 10,
  },
  infoPillsContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 50,
    marginRight: wp('3%'),
    borderWidth: 1,
    borderColor: '#eee'
  },
  infoPillText: {
    marginLeft: wp('2%'),
    fontSize: hp('1.8%'),
    fontWeight: '500',
    color: '#555',
  },
  section: {
    marginTop: hp('1%'),
  },
  description: {
    fontSize: hp('1.9%'),
    color: '#666',
    lineHeight: hp('2.8%'),
  },
  equipmentCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      padding: wp('4%'),
      borderRadius: 15
  },
  equipmentText: {
      marginLeft: wp('4%'),
      fontSize: hp('2%'),
      fontWeight: '500',
      color: '#333',
      textTransform: 'capitalize'
  }
});

export default ExerciseDetailScreen;