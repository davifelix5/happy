import React, { useEffect, useState, useContext } from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker, MapEvent } from 'react-native-maps'

import Loader from '../../../components/Loader'

import mapMarkerImg from '../../../images/map-marker.png'

import getUserLocation from '../../../utils/location'

import styles from './styles/map'

import { RegistrationContext } from '../registrationContext'


export default function SelectMapPosition() {

  const navigation = useNavigation()

  const {
    latitude,
    longitude,
    setLatitude,
    setLongitude,
  } = useContext(RegistrationContext)

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [positionFound, setPositionFound] = useState(false)
  const [mapClicked, setMapClicked] = useState(false)

  function handleNextStep() {
    navigation.navigate('OrphanageData')
  }

  function handleMapClick(event: MapEvent) {
    setMapClicked(true)
    const { coordinate } = event.nativeEvent
    const { latitude, longitude } = coordinate
    setLatitude(latitude)
    setLongitude(longitude)
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
            coordinate={{
              latitude,
              longitude
            }}
          />
        </MapView>
      ) : <Loader />}


      {mapClicked && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}