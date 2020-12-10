import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Card from '../shared/Card'

export default function Details({ navigation }) {
  return (
    <View>
      <Card>
        <Text>{navigation.getParam('title')}</Text>
        <Text>{navigation.getParam('body')}</Text>
        <Text>{navigation.getParam('rating')}</Text>
      </Card>
    </View>
  )
}