import React, { useState, useEffect } from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

export default function SingleHabitCalendar(props) {
  const currentDate = props.date
  const selectedHabit = props.selectedHabit
  var markedDates = {}

  const getDateOffset = (date, num) => {
    var utc = new Date(date)
    utc.setDate(utc.getDate() + num)
    return utc.toISOString().split('T')[0]
  }

  var color = "white"
  var dates = []
  for (var key in props.habits) {
    if (props.habits[key].name == selectedHabit) {
      color = props.habits[key].color
      dates = props.habits[key].dates_completed
    }
  }

  for (var key in dates) {
    const prevDate = getDateOffset(dates[key], -1)
    const nextDate = getDateOffset(dates[key], 1)

    if (dates.includes(prevDate) && dates.includes(nextDate)) {
      markedDates[dates[key]] = {color: color}
    } else if (dates.includes(prevDate) && !dates.includes(nextDate)) {
      markedDates[dates[key]] = {endingDay: true, color: color}
    } else if (!dates.includes(prevDate) && dates.includes(nextDate)) {
      markedDates[dates[key]] = {startingDay: true, color: color}
    } else if (!dates.includes(prevDate) && !dates.includes(nextDate)) {
      markedDates[dates[key]] = {startingDay: true, endingDay: true, color: color}
    }
  }

  return (
    <Calendar
      markingType={'period'}
      horizontal={true}
      current={Date()}
      //onDayPress={(day) => {console.log("lol")}}
      enableSwipeMonths={true}
      markedDates={markedDates}
    />
  )
}