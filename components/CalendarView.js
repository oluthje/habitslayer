import React, { useState, useEffect } from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

export default function CalendarView() {
  return (
    <Calendar
      horizontal={true}

      current={Date()}

      enableSwipeMonths={true}

      markedDates={{
        '2021-09-16': {selected: true, marked: true, selectedColor: 'blue'},
        '2021-09-17': {marked: true},
        '2021-09-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        '2021-09-19': {disabled: true, disableTouchEvent: true}
      }}
    />
  )
}