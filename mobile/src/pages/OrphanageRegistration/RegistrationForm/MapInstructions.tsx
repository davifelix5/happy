import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'

import hand from '../../../images/hand.png'

import styles from './styles/instruction'

interface MapInstructionsProps {
  showInstruciotns: boolean
  onTouch(): void
}

export default function MapInstructions({ showInstruciotns, onTouch }: MapInstructionsProps) {

  return showInstruciotns ? (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onTouch}>
        <View style={styles.content}>
          <Image source={hand} />
          <Text style={styles.text}>
            Toque no mapa para adicionar um orfanato
        </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  ) : null
}