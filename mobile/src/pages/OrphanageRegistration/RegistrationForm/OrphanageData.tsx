import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'

import PhoneInput from '../components/PhoneInput'

import styles from './styles/registration'

import { RegistrationContext } from '../registrationContext'

interface ImageDisplay {
  name: string,
  uri: string
}

export default function OrphanageData() {

  const navigation = useNavigation()

  const [formCompleted, setFormCompleted] = useState(false)
  const [displayImages, setDisplayImages] = useState<ImageDisplay[]>([])
  const [imageCount, setImageCount] = useState(1)

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
    const displayImage = { name: `image_${imageCount}.jpg`, uri: image }

    setImageCount(imageCount + 1)
    setImages([...images, image])
    setDisplayImages([...displayImages, displayImage])
  }

  function handleRemoveImage(index: number) {
    setDisplayImages(displayImages.filter((img, i) => i !== index))
    setImages(images.filter((img, i) => i !== index))
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

      <Text style={styles.label}>Número do WhatsApp</Text>
      <PhoneInput
        setValue={setWhatsapp}
        value={whatsapp}
      />

      <Text style={styles.label}>Fotos</Text>
      <View>
        {displayImages.map((img, index) => {
          return (
            <LinearGradient
              style={styles.imageContainer}
              key={img.uri}
              colors={['#EDFFF6', '#FCF0F4']}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Image
                style={styles.uploadedImage}
                source={{ uri: img.uri }}
              />
              <Text style={styles.imageName}>{img.name}</Text>
              <BorderlessButton
                style={styles.removeImageButton}
                onPress={() => handleRemoveImage(index)}
              >
                <Feather name="x" size={24} color="#FF669D" />
              </BorderlessButton>
            </LinearGradient>
          )
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>
      <RectButton
        style={formCompleted ? [styles.nextButton, styles.nextButtonEnabled] : [styles.nextButton, styles.nextButtonDisabled]}
        onPress={handleNavigateToNextScreen}
        enabled={formCompleted}
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </ScrollView>
  )
}