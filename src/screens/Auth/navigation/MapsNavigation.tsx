import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NearbyTherapistScreen from '../../chatfeature/MapsScreen';
import ClinicDetailsScreen from '../../chatfeature/ClinicDetailsScreen';
import TermsAndConditionsScreen from '../Termsandconditions';
import HomeScreen from '../../chatfeature/Homescreen';

const Stack = createNativeStackNavigator();

export default function MapsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NearbyTherapists" component={NearbyTherapistScreen} />
      <Stack.Screen name="ClinicDetails" component={ClinicDetailsScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
