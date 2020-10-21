import React from 'react'
import { View } from 'react-native'

import Button from '../Button'
import Dots from '../Dots'

import styles from './styles'

interface BottomContentProps {
  handlePressButton(): void
  dotsLength: number
  dotsActiveIndex: number
}

export default function BottomContent({
  handlePressButton,
  dotsLength,
  dotsActiveIndex
}: BottomContentProps) {
  return (
    <View style={styles.container}>
      <Dots length={dotsLength} activeIndex={dotsActiveIndex} />
      <Button onPress={handlePressButton} />
    </View>
  )
}