import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import SelectMapPosition from './pages/OrphanageRegistration/SelectMapPosition'
import RegistrationForm from './pages/OrphanageRegistration/RegistrationForm'

import Header from './components/Header'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f3f4f5' } }}>
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
        />
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header title="Orfanato" />
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />
        <Screen
          name="RegistrationForm"
          component={RegistrationForm}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" showCloseBtn />
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}