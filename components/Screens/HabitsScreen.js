import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native'
import AddHabitModal from "../AddHabitModal"
import SingleHabitCalendar from "../SingleHabitCalendar"
import HabitList from "../HabitList"

export default function HabitsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState()
  const commonProps = props.commonProps
  const habits = commonProps.habits

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AddHabitModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)} onAddHabit={commonProps.onAddHabit}/>
      <HabitList
        habits={habits}
        onRemoveHabit={commonProps.onRemoveHabit}
        habitDeletion={true}
        habitCompletion={false}
        selectedHabit={selectedHabit}
        setSelectedHabit={setSelectedHabit}
        someWeirdProp={"hello"}
      />
      <Button onPress={() => setModalVisible(!modalVisible)} title="Add Habit"></Button>
      <SingleHabitCalendar
        habits={habits}
        date={commonProps.date}
        setDate={commonProps.setDate}
        selectedHabit={selectedHabit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebf0',
  },
})
