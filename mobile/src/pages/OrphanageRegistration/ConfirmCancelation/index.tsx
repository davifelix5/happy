import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableHighlight } from 'react-native'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

export default function ConfirmCancelation() {

  const navigation = useNavigation()

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToMap() {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="x" size={32} color="#FF669D" />
      </View>
      <Text style={styles.title}>
        Cancelar cadastro
      </Text>
      <Text style={styles.infoText}>
        Tem certeza que quer
        cancelar esse cadastro?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={[styles.button, styles.noButton]} onPress={handleNavigateBack}>
          <Text style={styles.buttonText}>Não</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button, styles.yesButton]} onPress={handleNavigateToMap}>
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}
