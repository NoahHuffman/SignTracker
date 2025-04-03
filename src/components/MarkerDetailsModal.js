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
  Image,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
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
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleCameraCapture = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchCamera(options, response => {
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

  const handleRemoveImage = () => {
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
          <Text style={styles.header}>Add Pin</Text>
          <View style={styles.imgButtonContainer}>
            <TouchableOpacity
              style={styles.imgButton}
              onPress={handleCameraCapture}>
              <FeatherIcon
                name="camera"
                size={20}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or</Text>

            <TouchableOpacity
              style={styles.imgButton}
              onPress={handleImagePick}>
              <FeatherIcon
                name="upload"
                size={20}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>

          {image && (
            <View style={styles.imageContainer}>
              <Image source={{uri: image}} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveImage}>
                <FeatherIcon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}

          <TextInput
            placeholder="Add Notes"
            value={notes}
            onChangeText={setNotes}
            style={styles.textInput}
            multiline={true}
            textAlignVertical="top"
          />

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
    backgroundColor: 'rgba(0, 0, 0, 0.  5)',
  },
  modalContainer: {
    width: '80%',
    minHeight: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  header: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  textInput: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  removeButton: {
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  imgButtonContainer: {
    marginHorizontal: 0,
  },
  imgButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    margin: 'auto',
  },
  icon: {
    marginRight: 6,
  },
  orText: {
    margin: 'auto',
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: '#e43e3e',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
    width: 80,
  },
  addButton: {
    backgroundColor: '#38a169',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
    width: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MarkerDetailsModal;
