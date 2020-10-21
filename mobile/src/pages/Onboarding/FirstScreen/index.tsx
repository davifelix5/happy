import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text } from 'react-native'

import Button from '../components/Button'
import Dots from '../components/Dots'

import globe from '../../../images/globe.png'

import styles from './styles'

export default function Onboarding() {

  const navigation = useNavigation()

  function handleNavigateToSecondScreen() {
    navigation.navigate('SecondScreen')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={globe} resizeMode="contain" />
      <Text style={styles.title}>Leve a felicidade para o mundo!</Text>
      <Text style={styles.text}>Visite orfanatos e mude o dia de várias crianças</Text>
    </View>
  )
}
