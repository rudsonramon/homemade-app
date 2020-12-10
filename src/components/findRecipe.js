import React, { useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, FlatList, TouchableOpacity, StyleSheet, ImageBackground, View, Button, Text } from 'react-native';
import Card from '../shared/Card'
import axios from 'axios'

export default function findRecipe({ navigation, route }) {
  const image = require('../../assets/backgroundMeal.png');
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  let recipeRequest = 'http://192.168.0.5:3333/report'
  let ingredientsRequest = 'http://192.168.0.5:3333/ingredients'

  //FILTERING ONLY THE FIELDS THAT WAS SELECTED BY THE USER
  let obj = ingredientList.filter(field => field.isSelected === true)
  //console.log('## ingredientList: ', ingredientList.filter(field => field.isSelected === true));
  
  //let str = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
  //console.log(' =====>>>>> TESTE:: ', Object.values(obj))
  
  const nameArr = obj.map(arr => arr.name);
  //console.log('nameArr: ', nameArr);

  useEffect(() => {
    recipeRequest = axios.get(recipeRequest, {params:{name:nameArr}})
    ingredientsRequest = axios.get(ingredientsRequest)
      axios.all([recipeRequest, ingredientsRequest])
        .then(axios.spread((...responses) => {
          setRecipes(responses[0].data)
          setIngredientList(responses[1].data)
        }))
        .catch(function (error) {
          console.log('API CALL - recipe/ingredient - error: ', error);
        })
  },[])
/**
  const addIngredients = e => {
    e.preventDefault();
    //setIngredients(prevIngredient => [...prevIngredient, { title: name }]);
    setIngredients(prevIngredient => [...prevIngredient, name ]);
  }
 */
  function getSelectedType() {
    return (route.params.title)
  }

  /**
  if (ingredientList) {
    let arr = ingredientList.map((item, index) => {
      item.isSelected = false
      return { ...item };
    })  
  }
 */
  
  const [allItems, setAllItems] = useState(ingredientList);
  const selectedIngredient = (item) => {
    const tempAllItems = [...allItems];
    tempAllItems.isSelected = !item.isSelected;
    setAllItems(tempAllItems);

    let temp = allItems.filter(parentItem => parentItem.id !== item.id)
    item.isSelected = !item.isSelected;
    temp = temp.concat(item);
    temp.sort((a, b) => parseInt(a.id) - parseInt(b.id))
  }

  const filteredRecipe = () => {
    const filteredRecipe = recipeRequest + "?name=" +  nameArr
    axios.get(filteredRecipe)
      .then(response => {
          setRecipes(response.data)
        })
        .catch(function (error) {
          console.log('API CALL - recipe/ingredient/?name= - error: ', error);
        })
    //console.log('@@@############ response: ====> ::  ', response)
  }

  return (
    <ScrollView>
        < View style={styles.container} >
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.headerText}>Pesquisando sobre receita: {route.params.title} </Text>
          <FlatList
            horizontal
            style={styles.flatListStyle}
            bounces={false}
            data={ingredientList}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={index} onPress={() => selectedIngredient(item, index)}>
                <Card key={index}>
                  {item.isSelected ? (
                    <>
                      <Text key={item.id} >{item.name}</Text>
                      <Text style={{ color: "green" }}>{"Selecionado"}</Text>
                    </>
                  ) : (
                    <>
                      <Text key={item.id} >{item.name}</Text>
                    </>
                  )}
                </Card>
              </TouchableOpacity>
            )
            }
            keyExtractor={(item) => { return item.index }}
          />
          <Text style={styles.titleListOfIngredients}>Lista de ingredientes:</Text>
          <SafeAreaView>
          <FlatList
            horizontal
            style={styles.flatListStyle}
            bounces={false}
            key={ingredients.title}
            data={ingredients}
            renderItem={({ item }) => (

              <Card key={item.id} testSelectedValue={true}>
                <Text key={item.title} >{ingredients}</Text>
                {//<ImageBackground key={item.illustration} source={item.illustration} style={styles.cardImage}></ImageBackground>
                }
              </Card>

            )
            }
            keyExtractor={(item) => item.index}
          />
          </SafeAreaView>
          <View style={styles.buttonStyle}>
            <Button
              style={styles.filterButton}
              title="FILTRAR RECEITA"
              onPress={filteredRecipe}
            />
          </View>
          <Text style={styles.listOfRecipes}>Lista de receitas:</Text>
          
          < FlatList horizontal keyExtractor={recipes.id} key={recipes.id} data={recipes} renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Detalhe da receita', { id: item.id, title: item.title, category: item.category, ingredients: nameArr, preparation: item.preparation })}>
              <Card key={item.title}>
                <Text>{item.title}</Text>
                <Text>{item.category}</Text>
                </Card>
                </TouchableOpacity>
            )
          }} style={styles.listOfRecipes} />
          <View style={styles.buttonStyle}>
            <Button
              title="Voltar"
              onPress={() => navigation.navigate('Receita')}
            />
          </View>
          </ImageBackground>
        </View >
    </ScrollView>
  )
}

findRecipe.navigationOptions = {
  title: 'findRecipe',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: 410,
    height: 605,
  }, cardImage: {
    height: 285,
    width: 175,
    position: 'relative',
  },
  buttonStyle: {
    margin:10
    },
  titleListOfIngredients: {
    position: 'absolute',
    top: 10,
    width: 200,
    height: 30,
    paddingTop: 5,
    margin: 5,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  }, listOfRecipes: {
    position: 'relative',
    padding: 8,
    fontWeight: 'bold',
    fontSize:15,
  },
  image: {
    height: 605,
    width: 420,
    position: 'relative',
  },
  input: {
    top: 0,
    left: 120,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    width: 200,
    borderRadius: 32
  },
  inputLabel: {
    left: 10,
    top: 30,
    fontSize: 15,
    fontWeight: 'bold',
    position: 'relative',
    width: 200,
  }, headerText: {
    position: 'relative',
    padding: 0,
    left: 10
  },
  flatListStyle: {
    paddingTop: 22,
    width: '100%',
    height: '10%',
  },
    filterButton: {
    paddingTop: 30,
  },
  card: {
    borderRadius: 35,
    elevation: 2,
    width: 230,
    height: 80,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.4,
    shadowRadius: 1,
    marginHorizontal: 2,
    marginVertical: 3
  },
  cardSelected: {
    borderRadius: 35,
    elevation: 2,
    width: 230,
    height: 80,
    backgroundColor: '#95f985',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.4,
    shadowRadius: 1,
    marginHorizontal: 2,
    marginVertical: 3
  },
});