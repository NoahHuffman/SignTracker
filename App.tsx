import './firebaseConfig';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapComponent from './src/components/MapComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <MapComponent></MapComponent>
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
