import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import image from '../../../images/success.png'

import styles from './styles'

export default function SuccessScreen() {

  const navigation = useNavigation()

  function handleNavigateToMap() {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <Image source={image} />
      <Text style={styles.title}>
        Ebaaa!
      </Text>
      <Text style={styles.infoText}>
        O cadastro deu certo e foi
        enviado ao administrador para ser
        aprovado. Agora é só esperar :)
      </Text>
      <RectButton style={styles.button} onPress={handleNavigateToMap}>
        <Text style={styles.buttonText}>
          Ok
        </Text>
      </RectButton>
    </View>
  )
}