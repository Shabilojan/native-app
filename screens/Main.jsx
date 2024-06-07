import React, { useState, useEffect } from 'react';
import { Button, Image, View, BackHandler } from 'react-native';
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
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default Main;
