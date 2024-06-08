import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const Main = ({ route, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (route.params?.action === 'camera') {
      handleCameraLaunch();
    } else if (route.params?.action === 'gallery') {
      openImagePicker();
    }
  }, [route.params?.action]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Menu');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 600,
      maxWidth: 340,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 600,
      maxWidth: 340,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      navigation.navigate('Menu');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
      navigation.navigate('Menu');
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../assets/BG2.png')} />
      <View style={styles.overlayContainer}>
        <View style={styles.cameraContainer}>
          <View style={styles.cameraPreview}>
            <View style={styles.cornerTopLeft}></View>
            <View style={styles.cornerTopRight}></View>
            <View style={styles.cornerBottomLeft}></View>
            <View style={styles.cornerBottomRight}></View>
          </View>
        </View>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 340,
    height: 600,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPreview: {
    width: 340,
    height: 600,
    borderWidth: 2,
    borderColor: 'gray',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: 30,
    height: 30,
    borderColor: 'white',
    borderLeftWidth: 5,
    borderTopWidth: 5,
  },
  cornerTopRight: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 30,
    height: 30,
    borderColor: 'white',
    borderRightWidth: 5,
    borderTopWidth: 5,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    width: 30,
    height: 30,
    borderColor: 'white',
    borderLeftWidth: 5,
    borderBottomWidth: 5,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    width: 30,
    height: 30,
    borderColor: 'white',
    borderRightWidth: 5,
    borderBottomWidth: 5,
  },
  selectedImage: {
    width: 340,
    height: 600,
    position: 'absolute',
  },
});

export default Main;
