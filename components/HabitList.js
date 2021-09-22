import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import HabitChecker from "../components/HabitChecker"
import { SwipeListView } from 'react-native-swipe-list-view'

export default function HabitList(props) {
  const [listData, setListData] = useState()
  const habitDeletion = props.habitDeletion
  const habitCompletion = props.habitCompletion
  const habits = props.habits
  const habits_length = habits ? habits.length : 0
  const rowTranslateAnimatedValues = {}
  Array(habits_length)
    .fill('')
    .forEach((_, i) => {
        rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1)
    })
  var animationIsRunning = false

  useEffect(() => {
    if (habits) {
      createListData(habits)
    }
  }, [habits, props.date])

  useEffect(() => {
    if (habits.length > 0 && !habitCompletion) {
      props.setSelectedHabit(habits[0].name)
    }
  }, [habits])

  const createListData = habits => {
    setListData(habits.map((habit, index) => ({
      key: `${index}`,
      name: habit.name,
      completed: habit.dates_completed.includes(props.date),
      color: habit.color
    })))
    Array(habits_length)
      .fill('')
      .forEach((_, i) => {
          rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1)
      })
  }

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData
    if (value < -Dimensions.get('window').width && !animationIsRunning && habitDeletion) {
      animationIsRunning = true
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData]
        const prevIndex = listData.findIndex(item => item.key === key)
        newData.splice(prevIndex, 1)
        setListData(newData)
        animationIsRunning = false
        props.onRemoveHabit(habits[prevIndex])
      })
    }
  }

  const onUpdateHabit = name => {
    if (habitCompletion) {
      props.onUpdateHabit(name)
    } else {
      props.setSelectedHabit(name)
    }
  }

  const renderItem = itemProps => {
    const completed = itemProps.item.completed
    var markBackground = completed ? { backgroundColor: itemProps.item.color } : { backgroundColor: 'white' }
    var color = 'white'
    if (props.selectedHabit == itemProps.item.name && !habitCompletion) {
      color = itemProps.item.color
    }

    return (
      <Animated.View
        // style={[styles.rowFrontContainer, {
        //     height: rowTranslateAnimatedValues[props.item.key].interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [0, 50],
        //     }),
        //   },
        // ]}
      >
        <TouchableHighlight
          onPress={() => onUpdateHabit(itemProps.item.name)}
          style={[styles.rowFront, {backgroundColor: color}]}
          underlayColor={'#AAA'}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={completed ? styles.lineThrough : null}>{itemProps.item.name}</Text>
            {habitCompletion ? <CompletionMark
              backgroundColor={markBackground}
              color={itemProps.item.color} />: null }
          </View>
        </TouchableHighlight>
      </Animated.View>
    )
  }

  const CompletionMark = (props) => {
    return (
      <View style={[styles.mark, props.backgroundColor, {borderColor: props.color}]} />
    )
  }

  const renderHiddenItem = () => {
    return (
      <View style={styles.rowBack}>
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe
        disableLeftSwipe={!habitDeletion}
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: "white",
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    marginVertical: 5,
    height: 55,
  },
  rowBack: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5
  },
  backRightBtn: {
    alignItems: 'center',
    borderRadius: 5,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  mark: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1
  },
  lineThrough: {
    textDecorationLine: 'line-through'
  },
})