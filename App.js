import selectType from './src/components/selectType';
import findRecipe from './src/components/findRecipe';
//import IngredientList from './src/components/IngredientList'
import RecipeDetail from './src/screen/RecipeDetail'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import React from 'react';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Receita' component={selectType} />
        <Stack.Screen name='Informe os ingredientes' component={findRecipe} />
        <Stack.Screen name='Detalhe da receita' component={RecipeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

