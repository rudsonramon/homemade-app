import React from 'react';
import { View, Text } from 'react-native';

const queryRecipe = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>About</Text>
  </View>
);

queryRecipe.navigationOptions = {
  title: 'Search',
}


export default queryRecipe;