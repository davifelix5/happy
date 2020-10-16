import React, { useState } from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker, MapEvent } from 'react-native-maps'

import mapMarkerImg from '../../../images/map-marker.png';

import styles from './styles'

export default function SelectMapPosition() {

  const navigation = useNavigation()

  const [coordinates, setCoordenates] = useState<[number, number]>([0, 0])

  function handleNextStep() {
    navigation.navigate('RegistrationForm', {
      latitude: coordinates[0],
      longitude: coordinates[1],
    })
  }

  function handleMapClick(event: MapEvent) {
    const { coordinate } = event.nativeEvent
    setCoordenates([coordinate.latitude, coordinate.longitude])
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -23.5668582,
          longitude: -46.660879,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleMapClick}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{ latitude: coordinates[0], longitude: coordinates[1] }}
        />
      </MapView>

      {coordinates[0] !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}