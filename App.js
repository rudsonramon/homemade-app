import selectType from './src/components/selectType';
import findRecipe from './src/components/findRecipe';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

