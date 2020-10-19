import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, View, Switch, Text, TextInput } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import Loader from '../../../components/Loader'

import { RegistrationContext } from '../registrationContext'

import styles from './styles/registration'

export default function OrphanageData() {

  const navigation = useNavigation()

  const [formCompleted, setFormCompleted] = useState(false)

  const {
    opening_hours, setOpeningHours,
    open_on_weekends, setOpenOnWeekends,
    instructions, setInstructions,
    sending, setSending,
    handleCreateOrphanage
  } = useContext(RegistrationContext)


  useEffect(() => {

    const requiredConditions = [
      opening_hours.length >= 10,
      instructions.length >= 10,
    ]

    const completed = requiredConditions.every(val => Boolean(val))

    setFormCompleted(completed)

  }, [opening_hours, instructions])

  async function handleSubmit() {
    setSending(true)
    try {
      await handleCreateOrphanage()
      navigation.navigate('SucessScreen')
    } catch (err) {
      const errorReponse = err.response.data
      alert(`${errorReponse.message}. Try again! (${errorReponse.status})`)
      setSending(false)
    }
  }

  if (sending) {
    return <Loader />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>

      <View style={styles.pageHeader}>
        <Text style={styles.title}>Visitação</Text>
        <Text style={styles.pageHeaderText}>
          01 - <Text style={[styles.pageHeaderText, styles.textStrong]}>02</Text>
        </Text>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={opening_hours}
        onChangeText={setOpeningHours}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      {formCompleted && (
        <RectButton style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Cadastrar</Text>
        </RectButton>
      )}
    </ScrollView>
  )
}