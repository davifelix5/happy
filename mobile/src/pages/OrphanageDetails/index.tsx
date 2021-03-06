import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import { Image, View, ScrollView, Text, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import Loader from '../../components/Loader'

import mapMarkerImg from '../../images/map-marker.png';

import api from '../../services/api'

import styles from './styles'

interface RouteParams {
  orphanageId: number
}

interface Orphanage {
  id: number,
  name: string,
  whatsapp: string,
  latitude: number,
  longitude: number,
  opening_hours: string,
  instructions: string,
  about: string,
  open_on_weekends: true,
  images: Array<{ id: number, url: string }>
}

export default function OrphanageDetail() {

  const route = useRoute()
  const { orphanageId } = route.params as RouteParams

  const [orphanage, setOrphanage] = useState({} as Orphanage)

  useEffect(() => {

    api.get(`orphanages/${orphanageId}`)
      .then(res => {
        setOrphanage(res.data.data)
      })
      .catch(() => {
        alert('Houve um erro ao procurar o orfanato')
      })

  }, [orphanageId])

  function handleOpenGoogleMaps() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`
    Linking.openURL(url)
  }

  function handleLinkToWhatsapp() {
    const text = `Olá, ${orphanage.name}. Gostaria de fazer uma visita e desejo mais informações`
    const url = `whatsapp://send?text=${text}&phone=+55${orphanage.whatsapp}`
    Linking.openURL(url)
  }

  if (!Object.keys(orphanage).length) {
    return <Loader />
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled  >
          {orphanage.images.map(img => {
            return (
              <Image key={img.id} style={styles.image} source={{ uri: img.url.replace('localhost', '192.168.0.104') }} />
            )
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            />
          </MapView>

          <TouchableOpacity style={styles.routesContainer} onPress={handleOpenGoogleMaps}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{orphanage.opening_hours}</Text>
          </View>
          {orphanage.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="check-circle" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
            </View>
          ) : (
              <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                <Feather name="x-circle" size={40} color="#FF6690" />
                <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
              </View>
            )}
        </View>

        <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}