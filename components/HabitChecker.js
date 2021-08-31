import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function HabitChecker(props) {
  const [checked, setChecked] = useState(false)
  const name = props.name

  const buttonStyle = checked ? styles.buttonSelected : styles.buttonUnselected
  const textStyle = checked ? styles.textUnselected : styles.textSelected

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => setChecked(!checked)}
      >
        <Text style={textStyle}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    margin: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "white",
    alignItems: "baseline",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonUnselected: {
    padding: 15,
  },
  buttonSelected: {
    backgroundColor: "#2ecc71",
    padding: 15,
  },
  textStyle: {
    fontWeight: "bold"
  },
  textUnselected: {
    textDecorationLine: 'line-through',
    fontWeight: "bold"
  },
  textSelected: {
    fontWeight: "bold"
  }
  // button: {
  //   alignItems: "center",
  //   borderRadius: 5,
  // },
  // buttonUnselected: {
  //   borderColor: "#2ecc71",
  //   padding: 15,
  //   borderWidth: 3
  // },
  // buttonSelected: {
  //   backgroundColor: "#2ecc71",
  //   padding: 18,
  // },
  // textStyle: {
  //   color: "#2ecc71",
  //   fontWeight: "bold"
  // },
  // textUnselected: {
  //   color: "white",
  //   textDecorationLine: 'line-through',
  //   fontWeight: "bold"
  // },
  // textSelected: {
  //   color: "#2ecc71",
  //   fontWeight: "bold"
  // }
})