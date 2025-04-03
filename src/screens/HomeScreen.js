import React, {useRef} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import MapComponent from '../components/MapComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';

const HomeScreen = () => {
  const panelRef = useRef(null);

  const openPanel = () => {
    panelRef.current.show();
  };

  const closePanel = () => {
    panelRef.current.hide();
  };

  return (
    <View style={styles.container}>
      <MapComponent></MapComponent>
      <View style={styles.button}>
        <Button title="Open Panel" onPress={openPanel} />
      </View>
      <SlidingUpPanel ref={panelRef} draggableRange={{top: 300, bottom: 0}}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Sliding Up Panel</Text>
          <Button title="Close Panel" onPress={closePanel} />
        </View>
      </SlidingUpPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: 'white',
    height: 300,
  },
  panelTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
