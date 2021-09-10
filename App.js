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
  const [date, setDate] = useState('2021-09-16')

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

  const addHabit = (name) => {
    let habit = {
      name: name,
      dates_completed: []
    }
    setHabits([...habits, habit])
    saveHabits([...habits, habit])
  }

  const handleUpdateHabit = (name) => {
    var index = 0
    for (var key in habits) {
      if (habits[key].name == name) {
        index = key
        break
      }
    }

    let newHabits = [...habits]
    let habit = newHabits[index]

    if (habit.dates_completed.includes(date)) {
      const index = habit.dates_completed.indexOf(date)
      if (index > -1) {
        habit.dates_completed.splice(index, 1);
      }
    } else {
      habit.dates_completed.push(date)
    }

    newHabits[key] = habit
    setHabits(newHabits)
    saveHabits(newHabits)
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
      <Tabs
        habits={habits}
        date={date}
        setDate={setDate}
        onAddHabit={addHabit}
        onRemoveHabit={handleRemoveHabit}
        onUpdateHabit={handleUpdateHabit}
      />
    </NavigationContainer>
  )
}

function Tabs(props) {
  const commonProps = {
    habits: props.habits,
    date: props.date,
    setDate: props.setDate,
    onAddHabit: props.onAddHabit,
    onRemoveHabit: props.onRemoveHabit,
    onUpdateHabit: props.onUpdateHabit
  }
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" children={props => <HomeScreen commonProps={commonProps} {...props} />} />
      <Tab.Screen name="Habits" children={props => <HabitsScreen commonProps={commonProps} {...props} />} />
    </Tab.Navigator>
  )
}