import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeScreen from "./components/Screens/HomeScreen"
import HabitsScreen from "./components/Screens/HabitsScreen"

const Tab = createBottomTabNavigator()

export default function App() {
  const [habits, setHabits] = useState([])

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
    <NavigationContainer>
      <Tabs habits={habits} onAddHabit={addHabit} onRemoveHabit={handleRemoveHabit} />
    </NavigationContainer>
  )
}

function Tabs(props) {
  const commonProps = {
    habits: props.habits,
    onAddHabit: props.onAddHabit,
    onRemoveHabit: props.onRemoveHabit,
  }
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" children={props => <HomeScreen commonProps={commonProps} {...props} />} />
      <Tab.Screen name="Habits" children={props => <HabitsScreen commonProps={commonProps} {...props} />} />
    </Tab.Navigator>
  )
}