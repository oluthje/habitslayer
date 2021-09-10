import React, { useState, useEffect } from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

export default function CalendarView(props) {
  const date = props.date

  return (
    <Calendar
      horizontal={true}
      current={Date()}
      onDayPress={(day) => {props.setDate(day.dateString)}}
      enableSwipeMonths={true}
      markedDates={{
        [date]: {selected: true, marked: true, selectedColor: 'blue'}
      }}
    />
  )
}