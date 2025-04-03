import React, {useState, useEffect, useRef} from 'react';
import {
  Modal,
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';

const MarkerDetailsModal = ({isVisible, onClose, onSubmit}) => {
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const slideAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

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
        <Animated.View
          style={[
            styles.modalContainer,
            {transform: [{translateY: slideAnim}]},
          ]}>
          <TextInput
            placeholder="Add Notes"
            value={notes}
            onChangeText={setNotes}
            style={styles.textInput}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.imgButton} onPress={handleImagePick}>
            <FeatherIcon
              name="upload"
              size={20}
              color="white"
              style={styles.uploadIcon}
            />
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
    width: '80%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    justifyContent: 'space-between',
  },
  textInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  imgButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 'auto',
    width: 200,
  },
  uploadIcon: {
    marginRight: 6,
  },
  cancelButton: {
    backgroundColor: '#e43e3e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    width: 80,
  },
  addButton: {
    backgroundColor: '#38a169',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    width: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MarkerDetailsModal;
