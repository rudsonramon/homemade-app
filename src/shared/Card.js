import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {props.children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  }
})