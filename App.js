import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native'
import HabitChecker from "./components/HabitChecker"
import AddHabitModal from "./components/AddHabitModal"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [habits, setHabits] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const getHabits = async (value) => {
    try {
      const value = await AsyncStorage.getItem('@habits')
      if(value !== null) {
        const parsedValue = JSON.parse(value)
        setHabits(parsedValue)
      }
    } catch(e) {
      console.log("error in getData")
      console.log(e)
    }
  }

  const saveHabits = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@habits', jsonValue)
    } catch (e) {
      console.log("error in saveHabit")
      console.log(e)
    }
  }

  const addHabit = (habit) => {
    setHabits(habits => [...habits, habit])
    saveHabits([...habits, habit])
  }

  useEffect(() => {
    getHabits()
  }, [])

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }

    console.log('Done.')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <AddHabitModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)} onAddHabit={addHabit}/>

      <HabitList habits={habits}/>

      <Button onPress={() => setModalVisible(!modalVisible)} title="Add Habit"></Button>
    </View>
  );
}

function HabitList(props) {
  const habits = props.habits
  console.log(habits)

  return (
    <View>
      <FlatList
        data={habits}
        renderItem={({item, index}) => (
          <HabitChecker key={index} name={item}/>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebf0',
    marginTop: StatusBar.currentHeight || 80,
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
