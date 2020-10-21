import React from 'react'
import { View } from 'react-native'

interface DotsProps {
  length: number,
  activeIndex: number,
}

import styles from './styles'

export default function Dots({ length, activeIndex }: DotsProps) {

  const range = Array.from(Array(length).keys())

  return (
    <View style={styles.paginationDots}>
      {range.map(index => {
        return index === activeIndex ? (
          <View key={index} style={styles.paginationActive} />
        ) : <View key={index} style={styles.pagination} />
      })}
    </View>
  )
}
