import React, { useState } from 'react';
import { ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Text, View, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')

const carouselItems = [
  {
    id: 1,
    title: "Doce",
    text: "[TEXTO DESCRITIVO]",
    illustration: require('../../assets/categoryDoce.png'),
  },
  {
    id: 2,
    title: "Salgada",
    text: "[DESCRIÇÃO]",
    illustration: require('../../assets/salgado.png'),
  },
]

export default function selectType({ navigation }) {
  const [state, setState] = useState({ activeIndex: 0 })
  function renderItem({ item, index }, parallaxProps) {

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Informe os ingredientes', { title: item.title })} style={{
        height: 300,
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
      }}>
        <ImageBackground
          source={item.illustration}
          style={styles.imageContainer}
        >
        </ImageBackground>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </TouchableOpacity>)
  }

  //const image = require('../../assets/wave.png');
  const image = require('../../assets/backgroundMultiMeal.png');

  return (

    <ScrollView >
      <View style={styles.container} >
        <ImageBackground source={image} style={styles.image}>
          <TouchableOpacity onPress={() => Alert.alert('Selecione o tipo de receita que quer pesquisar')}>
            <Text style={styles.titleText}>Selecione o tipo de receita</Text>
              <Carousel
                layout={"default"}
                ref={ref => carousel = ref}
                data={carouselItems}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                renderItem={renderItem}
                onSnapToItem={index => setState({ activeIndex: index })}
                hasParallaxImages={true}
              />
          </TouchableOpacity>
        </ImageBackground>
      </View >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    margin: 0,
    backgroundColor: '#fff',
  }, titleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    height: 250,
    width: 350,
    margin:0
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: 'relative',
    bottom: 0,
    width: 'auto',
    height: 600,
    margin: 0,
  },
});
