import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Text, View } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')

function renderItem({ item, index }, parallaxProps) {

  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item.thumbnail }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  )
}

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function App() {
  const [state, setState] = useState({ activeIndex: 0 })
  const carouselItems = [
    {
      title: "Doce",
      text: "[TEXTO DESCRITIVO]",
      thumbnail: "assets/splash.png",
    },
    {
      title: "Salgado",
      text: "[DESCRIÇÃO]",
      thumbnail: "assets/splash.png",
    },
  ]

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity>
      <Carousel
        layout={"default"}
        ref={ref => carousel = ref}
        data={carouselItems}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        renderItem={renderItem}
        onSnapToItem={index => setState({ activeIndex: index })}
        hasParallaxImages={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: '#333',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
