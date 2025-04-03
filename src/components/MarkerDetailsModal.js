import React, {useState} from 'react';
import {Modal, View, TextInput, Button, Image, StyleSheet} from 'react-native';
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
    <Modal visible={isVisible} onRequestClose={onClose} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Enter notes"
            value={notes}
            onChangeText={setNotes}
            style={styles.textInput}
          />
          <Button title="Select Image" onPress={handleImagePick} />
          {image && <Image source={{uri: image}} style={styles.image} />}
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  textInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default MarkerDetailsModal;
