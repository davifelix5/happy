import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'

import PhoneInput from '../components/PhoneInput'

import styles from './styles/registration'

import { RegistrationContext } from '../registrationContext'


export default function OrphanageData() {

  const navigation = useNavigation()

  const [formCompelted, setFormCompleted] = useState(false)

  const {
    name, setName,
    about, setAbout,
    setWhatsapp, whatsapp,
    images, setImages
  } = useContext(RegistrationContext)

  useEffect(() => {

    const requiredConditions = [
      name.length >= 5,
      about.length >= 10,
      images.length,
      whatsapp.length === 11
    ]

    const completed = requiredConditions.every(val => Boolean(val))

    setFormCompleted(completed)

  }, [name, about, images, whatsapp])

  async function handleNavigateToNextScreen() {
    navigation.navigate('OrphanageVisitation')
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status !== 'granted') {
      alert('É preciso o acesso da galeria!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled) return

    const image = result.uri
    setImages([...images, image])
  }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.pageHeader}>
        <Text style={styles.title}>Dados</Text>
        <Text style={styles.pageHeaderText}>
          <Text style={[styles.pageHeaderText, styles.textStrong]}>01</Text> - 02
        </Text>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        onChangeText={setAbout}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <PhoneInput
        setValue={setWhatsapp}
      />

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContainer}>
        {images.map(img => {
          return (
            <Image
              style={styles.uploadedImage}
              key={img}
              source={{ uri: img }}
            />
          )
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>
      {formCompelted && (
        <RectButton style={styles.nextButton} onPress={handleNavigateToNextScreen}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </ScrollView>
  )
}