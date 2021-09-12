import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable, TextInput, Alert } from 'react-native'
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
        title={"Controlled Color Palette:"}
        icon={
          <Text>✔</Text>
        // React-Native-Vector-Icons Example
        }
    />)
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Enter a habit"
            />
            <ControlledColorPicker color={color} setColor={setColor} />
            <View style={{ flexDirection:"row", margin: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => close()}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => addHabit()}
              >
                <Text style={styles.textStyle}>Add Habit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
  },
});