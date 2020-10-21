import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

export default function Button({ ...props }) {
  return (
    <RectButton style={styles.button} {...props}>
      <Feather name="arrow-right" size={25} color="#15C3D6" />
    </RectButton>
  )
}
