import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

interface HeaderProps {
  title: string,
  showCloseBtn?: boolean,
  closePageName?: string
}

export default function Header({
  title,
  showCloseBtn = false,
  closePageName = 'OrphanagesMap'
}: HeaderProps) {

  const navigation = useNavigation()

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleClose() {
    navigation.navigate(closePageName)
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={handleNavigateBack}>
        <Feather name="arrow-left" size={24} color="#15bcd6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCloseBtn ? (
        <BorderlessButton onPress={handleClose}>
          <Feather name="x" size={24} color="#f69d" />
        </BorderlessButton>
      ) : <View />}
    </View>
  )
}

