import React, { useCallback, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native'

import FirstScreen from './FirstScreen'
import SecondScreen from './SecondScreen'
import BottomContent from './components/BottomContent'

export default function Onboarding() {

  const navigation = useNavigation()

  const [activeIndex, setActiveIndex] = useState(0)

  const scrollRef = useRef<ScrollView>(null)

  const handleButtonPress = useCallback(() => {
    if (activeIndex === 1) {
      navigation.navigate('OrphanagesMap')
      return
    }
    scrollRef.current?.scrollToEnd()
    setActiveIndex(1)
  }, [activeIndex])

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const windowWidth = Dimensions.get('window').width
    const scrollOffset = event.nativeEvent.contentOffset.x
    setActiveIndex(Number(scrollOffset > (windowWidth / 2)))
  }

  return (
    <>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <FirstScreen />
        <SecondScreen />
      </ScrollView>
      <BottomContent dotsLength={2} dotsActiveIndex={activeIndex} handlePressButton={handleButtonPress} />
    </>
  )
}
