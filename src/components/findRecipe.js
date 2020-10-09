import React, { useState } from 'react';
import { TextInput, StyleSheet, ImageBackground, View, Button, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default function findRecipe({ navigation, route }) {
  const [recipes, setRecipes] = useState([
    { id: 1, type: 'Salgada', name: 'pão de forma', key: '1', ingredients: ['sal', 'ovo', 'mantega', 'maionese', 'farinha'] },
    { id: 2, type: 'Salgada', name: 'macarrao ao molho branco', key: '2', ingredients: ['macarrao', 'oleo', 'creme de leite'] },
    { id: 3, type: 'Salgada', name: 'Arroz marroquino', key: '3', ingredients: ['A', 'B', 'C'] },
    { id: 4, type: 'Doce', name: 'Bolo', key: '4', ingredients: ['farinha', 'açucar', 'etc'] },
    { id: 5, type: 'Doce', name: 'doce de leite', key: '5', ingredients: ['AA', 'BB', 'CC'] },
  ])

  const [tableData, settableData] = useState([
    {
      head: 'Ingredientes',
      rows: ['', '']
    }
  ])

  const image = require('../../assets/wave.png');
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={image} style={styles.image}>
        <Text>Pesquisando sobre receita: {route.params.title} </Text>
        <TextInput>teste</TextInput>
        <Button
          title="Ir para Receita"
          onPress={() => navigation.navigate('Receita')}
        />
      </ImageBackground>
    </View >)
}

findRecipe.navigationOptions = {
  title: 'findRecipe',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    margin: 0,
    height: 150,
    width: 400,
    bottom: 0,
    position: 'absolute',
  },
});