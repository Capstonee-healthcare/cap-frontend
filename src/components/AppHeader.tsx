import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

interface AppHeaderProps {
  type: 'main' | 'sub' | 'subtle';
  title?: string;
  showBell?: boolean;
  showBack?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  type, 
  title, 
  showBell = false, 
  showBack = true 
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    // Handle notification press
    console.log('Notification pressed');
  };

  if (type === 'main') {
    return (
      <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
        <View style={styles.mainHeader}>
          <Text style={styles.mainTitle}>Kyntra</Text>
          {showBell && (
            <TouchableOpacity onPress={handleNotificationPress}>
              <Ionicons name="notifications-outline" size={wp('6%')} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (type === 'subtle') {
    return (
      <SafeAreaView style={styles.subtleContainer} edges={['top', 'left', 'right']}>
        <View style={styles.subtleHeader}>
          <Text style={styles.subtleTitle}>{title}</Text>
          {showBell && (
            <TouchableOpacity onPress={handleNotificationPress}>
              <Ionicons name="notifications-outline" size={wp('6%')} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Sub header (with back button)
  return (
    <SafeAreaView style={styles.subContainer} edges={['top', 'left', 'right']}>
      <View style={styles.subHeader}>
        {showBack && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={wp('6%')} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.subTitle}>{title}</Text>
        <View style={styles.placeholder} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  mainTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#333',
  },
  subtleContainer: {
    backgroundColor: '#fff',
  },
  subtleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  subtleTitle: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: '#333',
  },
  subContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  backButton: {
    marginRight: wp('4%'),
  },
  subTitle: {
    flex: 1,
    fontSize: hp('2.2%'),
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  placeholder: {
    width: wp('6%'), // Same width as back button for centering
  },
});

export default AppHeader;
