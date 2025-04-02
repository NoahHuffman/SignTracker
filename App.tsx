import './firebaseConfig';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapComponent from './src/components/MapComponent';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen></HomeScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
