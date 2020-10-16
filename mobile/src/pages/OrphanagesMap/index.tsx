import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'

import mapMarker from '../../images/map-marker.png'

import api from '../../services/api'

import styles from './styles'

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {

  const navigation = useNavigation()

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  function handleNavigateToDetail(orphanageId: number) {
    navigation.navigate('OrphanageDetails', { orphanageId })
  }

  function handleNavigateToRegistration() {
    navigation.navigate('SelectMapPosition')
  }

  useFocusEffect(() => {
    api.get('/orphanages')
      .then(res => {
        setOrphanages(res.data.data)
      })
      .catch(() => {
        alert('Houve um erro ao achar os orfanatos.')
      })
  })


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -23.5668582,
          longitude: -46.660879,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orph => {
          return (
            <Marker
              key={orph.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orph.latitude,
                longitude: orph.longitude,
              }}
            >

              <Callout tooltip
                onPress={() => handleNavigateToDetail(orph.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>
                    {orph.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
          </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToRegistration}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}
