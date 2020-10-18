import React, { useState } from 'react'
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'

import api from '../../../services/api'

import styles from './styles'

interface RouteParams {
  latitude: number,
  longitude: number,
}

export default function OrphanageData() {

  const navigation = useNavigation()
  const route = useRoute()

  const coordinates = route.params as RouteParams

  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [instructions, setInstructions] = useState('')
  const [about, setAbout] = useState('')
  const [openOnWeekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<string[]>([])

  async function handleSubmit() {
    const data = new FormData()

    data.append('latitude', String(coordinates.latitude))
    data.append('longitude', String(coordinates.longitude))
    data.append('name', name)
    data.append('whatsapp', whatsapp)
    data.append('opening_hours', openingHours)
    data.append('instructions', instructions)
    data.append('about', about)
    data.append('open_on_weekends', String(openOnWeekends))

    images.forEach((img, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: img
      } as any)
    })

    try {
      await api.post('orphanages', data)
      alert('Orfanato cadastrado com sucesso!')
    } catch (err) {
      alert(`${err.response.data.message} (${err.response.data.status})`)
    }

    navigation.navigate('OrphanagesMap')
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
      <Text style={styles.title}>Dados</Text>

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
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
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

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={openingHours}
        onChangeText={setOpeningHours}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}