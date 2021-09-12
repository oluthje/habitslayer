import React, { useState, useEffect } from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

export default function CalendarView(props) {
  const date = props.date
  var markedDates = {}

  for (var key in props.habits) {
    const completedDates = props.habits[key].dates_completed
    const color = props.habits[key].color
    
    for (var index in completedDates) {
      const currentDate = completedDates[index]
      const dot = {marked: true, color: color}
      if (markedDates[currentDate]) {
        var dots = markedDates[currentDate].dots
        dots.push(dot)
      } else {
        markedDates[currentDate] = {marked: true, dots: [dot]}
      }
    }
  }

  if (markedDates[date]) {
    markedDates[date].selected = true
  } else {
    markedDates[date] = {selected: true}
  }

  return (
    <Calendar
      markingType={'multi-dot'}
      horizontal={true}
      current={Date()}
      onDayPress={(day) => {props.setDate(day.dateString)}}
      enableSwipeMonths={true}
      markedDates={markedDates}
    />
  )
}