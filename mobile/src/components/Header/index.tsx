import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

interface HeaderProps {
  title: string,
  showCloseBtn?: boolean
}

export default function Header({ title, showCloseBtn = false }: HeaderProps) {

  const navigation = useNavigation()

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToInicialScreen() {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={handleNavigateBack}>
        <Feather name="arrow-left" size={24} color="#15bcd6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCloseBtn ? (
        <BorderlessButton onPress={handleNavigateToInicialScreen}>
          <Feather name="x" size={24} color="#f69d" />
        </BorderlessButton>
      ) : <View />}
    </View>
  )
}
