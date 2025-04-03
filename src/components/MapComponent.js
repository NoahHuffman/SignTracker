import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MarkerDetailsModal from './MarkerDetailsModal';

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  const handleMapPress = event => {
    if (!isModalVisible) {
      const coordinate = event.nativeEvent.coordinate;
      setSelectedCoordinate(coordinate);
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onPress={handleMapPress}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={`Marker ${index + 1}`}
            description={marker.notes}
          />
        ))}
      </MapView>
      <MarkerDetailsModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={(notes, image) => {
          if (selectedCoordinate) {
            setMarkers([
              ...markers,
              {coordinate: selectedCoordinate, notes, image},
            ]);
            setSelectedCoordinate(null);
            setIsModalVisible(false);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
