import React, { useState, useEffect} from 'react'
import { View, Text, FlatList } from 'react-native'
import axios from 'axios'
import Card from '../shared/Card'
//import RecipeApi from '../../apis/Recipes'
//import findRecipe from './findRecipe'

const RecipeCard = ({ }) => {
  const [recipeList, setRecipeList] = useState([])
  useEffect(() => {
    // Make a request for list of Recipes
    //function getListOfRecipe(){
      axios({
        method: 'get',
        url: "http://192.168.137.1:3333/report",
        responseType: 'json',
        headers: {},
        params: {
          //name: ["'acem'", "'sal grosso'"]
          name: ["''"]
        }
      })
        .then(function (res) {
          // handle success
          console.log("######## CARD CALL - IT's OK!!! :: ", res.data);
          setRecipeList(res.data)
        })
        .catch(function (error) {
          console.log('API CALL - /report - error: ', error);
        })
    
  },[])

  console.log('recipeList: ', recipeList)

  return (
    <View>
      <Text>
        Recipe Card:
        < FlatList horizontal keyExtractor={recipeList.id} key={recipeList.id} data={recipeList} renderItem={({ item }) => {
          return (
            <Card key={item.id}>
              <Text key={item.id}>{item.title}</Text>
            </Card>
            )
        }} />
      </Text>
    </View>
  )
}

export default RecipeCard