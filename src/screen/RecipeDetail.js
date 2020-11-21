import React, { useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, View, Text, FlatList } from 'react-native';
import Card from '../shared/Card'
import axios from 'axios'

export default function Details({ navigation, route }) {
  let recipe_id = route.params.id
  const [ingredientByRecipe, setIngredientsByRecipe] = useState()

  const ingredientByRecipeUrl = "http://192.168.0.3:3333" + "/recipes/" + recipe_id + "/ingredients"
  useEffect(() => { 
  axios.get(ingredientByRecipeUrl)
    .then(response => {
        setIngredientsByRecipe(response.data)
      })
      .catch(function (error) {
        console.log('API CALL - recipe/:recipe_id/ingredients - error: ', error);
      })
    },[])
  console.log('ingredientByRecipe: ', ingredientByRecipe)

  const image = require('../../assets/sobremesaColorida.png')
  
  const getIngredientComponent = (item, index) => {
    return (
      <TouchableOpacity key={index} >
        <Card key={index}>
          <Text key={index}> {item.quantity} {item.measure} </Text>
          <Text style={styles.cardText} key={item.name}> {item.name} </Text>
          <Text key={item.observation} >{item.observation} </Text>
        </Card>
      </TouchableOpacity>
    )
    
  }
  //INSERT API CALL TO GET RECIPE DETAILS
  return (
    <ScrollView>
      < View style={styles.container} >
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.textTitle}>Categoria: {route.params.category}</Text>
          <Text style={styles.textStyle}>Receita: {route.params.title}</Text>
          <Text style={styles.textStyle}>Ingredientes: </Text>
          <SafeAreaView style={styles.flatListItemStyle}>
            <FlatList
              //numColumns={1}
                bounces={false}
                data={ingredientByRecipe}
                renderItem={({ item, index }) => (
                  getIngredientComponent(item, index)
                )
                }
                keyExtractor={(item) => { return item.index }}
              />
          </SafeAreaView>
          <Text style={styles.textStyle}>Modo de preparo: </Text>
          <Text style={styles.textStyle}>{route.params.preparation} </Text>
        </ImageBackground>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 605,
    width: 420,
  },
  flatListItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    flex: 1,
    margin: 1,
  },
  textStyle: {
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    opacity: 0.7
  },
  textTitle: {
    padding: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#FFF',
    opacity: 0.8,
  },
  fieldBorder: {
    width: 160,
    height:'7%',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize:18,
  }
});