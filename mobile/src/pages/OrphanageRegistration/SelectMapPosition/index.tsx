import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker, MapEvent } from 'react-native-maps'

import mapMarkerImg from '../../../images/map-marker.png';

import getUserLocation from '../../../utils/location'

import styles from './styles'

export default function SelectMapPosition() {

  const navigation = useNavigation()

  const [coordinates, setCoordenates] = useState({ latitude: 0, longitude: 0 })
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [positionFound, setPositionFound] = useState(false)
  const [mapClicked, setMapClicked] = useState(false)

  function handleNextStep() {
    navigation.navigate('RegistrationForm', coordinates)
  }

  function handleMapClick(event: MapEvent) {
    setMapClicked(true)
    const { coordinate: position } = event.nativeEvent
    setCoordenates(position)
  }

  useEffect(() => {
    getUserLocation()
      .then(res => {
        setPosition(res)
        setPositionFound(true)
      })
      .catch(() => {
        setPosition({ latitude: -23.5489, longitude: -46.6388 })
        setPositionFound(true)
      })
  }, [])

  return (
    <View style={styles.container}>
      {positionFound ? (
        <MapView
          initialRegion={{
            ...position,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleMapClick}
        >
          <Marker
            icon={mapMarkerImg}
            coordinate={coordinates}
          />
        </MapView>
      ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}


      {mapClicked && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}