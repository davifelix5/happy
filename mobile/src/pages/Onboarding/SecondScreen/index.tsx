import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text } from 'react-native'

import Button from '../components/Button'
import Dots from '../components/Dots'

import children from '../../../images/children.png'

import styles from './styles'

export default function Onboarding() {

  const navigation = useNavigation()

  function handleOpenApp() {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={children} resizeMode="contain" />
      <Text style={styles.title} >
        Escolha um orfanato no mapa e faça uma visita
      </Text >
    </View >
  )
}
