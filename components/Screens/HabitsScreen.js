import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native'
import AddHabitModal from "../AddHabitModal"
import CalendarView from "../CalendarView"
import HabitList from "../HabitList"

export default function HabitsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const commonProps = props.commonProps
  const habits = commonProps.habits

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <AddHabitModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)} onAddHabit={commonProps.onAddHabit}/>

      <HabitList habits={habits} onRemoveHabit={commonProps.onRemoveHabit}/>

      <Button onPress={() => setModalVisible(!modalVisible)} title="Add Habit"></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebf0',
  },
})
