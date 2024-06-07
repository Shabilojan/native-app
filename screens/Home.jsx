import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation && typeof navigation.navigate === 'function') {
        navigation.navigate('Menu');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground style={styles.container} source={require('../assets/Bg.png')}>
      <ImageBackground
        style={styles.overlayImage}
        source={require('../assets/Overlay.jpg')}
        imageStyle={{ opacity: 0.25 }}
      >
        <View style={styles.darkOverlay} />
        <View style={styles.content}>
          <Image style={styles.logo} source={require('../assets/Logo.png')} />
          <ActivityIndicator size="large" color="#00ff00" style={styles.activityIndicator} />
          <View style={styles.textView}>
            <Text style={styles.text}>Powered By</Text>
            <Text style={[styles.text, styles.marginTop20]}>Green Tech Investors</Text>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 80,
    alignSelf: 'center',
  },
  activityIndicator: {
    marginTop: 10,
  },
  textView: {
    marginTop: 80,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 15,
  },
  marginTop20: {
    marginTop: 20,
  },
});

export default Home;
