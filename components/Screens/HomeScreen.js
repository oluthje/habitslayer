import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import HabitList from "../HabitList"
import CalendarView from "../CalendarView"

export default function HomeScreen(props) {
  const commonProps = props.commonProps
  const habits = commonProps.habits

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HabitList
        habits={habits}
        date={commonProps.date}
        onRemoveHabit={commonProps.onRemoveHabit}
        onUpdateHabit={commonProps.onUpdateHabit}
        habitDeletion={false}
        habitCompletion={true}
      />
      <CalendarView
        habits={habits}
        date={commonProps.date}
        setDate={commonProps.setDate}
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
