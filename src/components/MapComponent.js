import React, {useState} from 'react';
import {View, StyleSheet, Modal, TextInput, Button, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {launchImageLibrary} from 'react-native-image-picker';

const MarkerDetailsModal = ({isVisible, onClose, onSubmit}) => {
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);

  const handleImagePick = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    onSubmit(notes, image);
    setNotes('');
    setImage(null);
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View>
        <TextInput
          placeholder="Enter notes"
          value={notes}
          onChangeText={setNotes}
        />
        <Button title="Select Image" onPress={handleImagePick} />
        {image && (
          <Image source={{uri: image}} style={{width: 100, height: 100}} />
        )}
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

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
