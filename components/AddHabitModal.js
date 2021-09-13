import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable, TextInput, Alert, Button } from 'react-native'
import ColorPalette from 'react-native-color-palette'

export default function AddHabitModal(props) {
  const colors = ['#9B59B6', '#3498DB', '#2ECC71', '#F1C40F', "#E67E22", "#E74C3C"]
  const [text, setText] = useState()
  const [color, setColor] = useState(colors[0])
  const visible = props.visible

  const addHabit = () => {
    if (text !== "") {
      props.onAddHabit(text, color)
      setText("")
      setColor(colors[0])
      close()
    }
  }

  const close = () => {
    props.onClose()
  }

  const ControlledColorPicker = (props) => {
    return (
      <ColorPalette
        onChange={color => setColor(color)}
        value={props.color}
        colors={colors}
        title={""}
        icon={
          <Text>✔</Text>
        // React-Native-Vector-Icons Example
        }
    />)
  }

  return (
    <View>
      <Modal
        presentationStyle={'pageSheet'}
        animationType="slide"
        visible={visible}
      >
        <View style={styles.titleView}>
          <Button title="Cancel" onPress={() => close()} />
          <Text style={styles.titleText}>New Habit</Text>
          <Button title="Add Habit" onPress={() => addHabit()} />
        </View>
        <View style={styles.centeredView}>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Enter a habit"
            />
            <ControlledColorPicker color={color} setColor={setColor} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    margin: 15
  },
  centeredView: {
    alignItems: "center",
  },
  titleText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgray'
  },
});