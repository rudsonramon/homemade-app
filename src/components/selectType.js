import React, { useState } from 'react';
import { ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Text, View, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')

const carouselItems = [
  {
    id: 1,
    title: "Doce",
    text: "[TEXTO DESCRITIVO]",
    illustration: require('../../assets/sobremesa.jpg'),
  },
  {
    id: 2,
    title: "Salgada",
    text: "[DESCRIÇÃO]",
    illustration: require('../../assets/refeicao.jpg'),
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

  const image = require('../../assets/wave.png');

  return (

    <ScrollView >
      <View style={styles.container} >
        <ImageBackground source={image} style={styles.image}>
          <TouchableOpacity onPress={() => Alert.alert('Selecione o tipo de receita que quer pesquisar')}>
            <Text style={styles.titleText}>Selecione o tipo de receita</Text>
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
            hasParallaxImages={true}
          />
        </ImageBackground>
      </View >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, button: {
    margin: '50 10',
    height: '333',
  }, titleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
  },
  item: {
    width: screenWidth - 50,
    height: screenWidth - 5,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 5,
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
