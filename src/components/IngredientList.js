import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios'

// You can import from local files

// or any pure javascript modules available in npm

export default function App() {
  const [ingredientList, setIngredientList] = useState([])
  useEffect(() => {
  //let recipeRequest = 'http://192.168.0.3:3333/report'
  let ingredientsRequest = 'http://192.168.0.5:3333/ingredients'
  //recipeRequest = axios.get(recipeRequest)
  axios.get(ingredientsRequest)
  //axios.all([ingredientsRequest])
    .then((response) => {
      setIngredientList(response.data)
    })
    .catch(function (error) {
      console.log('API CALL - recipe/ingredient - error: ', error);
    })
  }, [ingredientList])
  
  let arr = ingredientList.map((item, index) => {
    item.selected = false
    return { ...item };
  })  

  const [selectedItem, setSelectedItem] = useState(null);
  const [allItems, setAllItems] = useState(arr);

  const selectedIngredient = (item) => {
    //console.log('selecionado: ' + item.name);
    setSelectedItem(item);
    /* Below operation can be improved by passing index to the function itself.
       so filtering would not be required
     */
    let temp = allItems.filter((parentItem) => parentItem.id !== item.id);
    item.selected = !item.selected;
    temp = temp.concat(item);
    temp.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    setAllItems(temp);
    console.log('allItems: ', allItems);
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        horizontal
        bounces={false}
        data={allItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.flatListItem}
            key={item.id}
            onPress={() => selectedIngredient(item)}>
            <Text>{item.name}</Text>
            {!item.selected ? (
              <Text style={{ color: 'red' }}>{'Not Selected'}</Text>
            ) : (
              <Text style={{ color: 'green' }}>{'Selected'}</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.index}
      />

      {selectedItem ? (
        <View style={styles.selectedTextView}>
          <Text style={styles.selectedText}>{`${selectedItem.name} ${
            selectedItem.selected ? 'selected' : 'not selected'
          }`}</Text>
        </View>
      ) : (
        <View style={styles.selectedTextView}>
          <Text style={styles.selectedText}>{`Nothing selected`}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  flatListItem: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTextView: {
    flex: 8,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  selectedText: {
    fontSize: 30,
  },
});