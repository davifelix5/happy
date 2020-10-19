import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import styles from './styles'

export default function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0089a5" />
    </View>
  )
}