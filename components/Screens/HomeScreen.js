import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native'
import AddHabitModal from "../AddHabitModal"
import HabitList from "../HabitList"
import CalendarView from "../CalendarView"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen() {
  const [habits, setHabits] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    getHabits()
  }, [])

  const getHabits = async (value) => {
    try {
      const value = await AsyncStorage.getItem('@habits')
      if(value !== null) {
        const parsedValue = JSON.parse(value)
        setHabits(parsedValue)
      }
    } catch(e) {
      // error
    }
  }

  const saveHabits = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@habits', jsonValue)
    } catch (e) {
      // error
    }
  }

  const addHabit = (habit) => {
    setHabits(habits => [...habits, habit])
    saveHabits([...habits, habit])
  }

  const handleRemoveHabit = (habit) => {
    const new_habits = habits.filter(item => item !== habit)
    setHabits(new_habits)
    saveHabits(new_habits)
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // error
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <AddHabitModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)} onAddHabit={addHabit}/>

      <HabitList habits={habits} onRemoveHabit={handleRemoveHabit}/>

      <Button onPress={() => setModalVisible(!modalVisible)} title="Add Habit"></Button>

      <CalendarView/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebf0',
  },
})
