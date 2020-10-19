import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import RegistrationRoutes from './pages/OrphanageRegistration/registration.routes'


import Header from './components/Header'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
  return (
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
        name="OrpahangeRegistration"
        component={RegistrationRoutes}
      />
    </Navigator>
  )
}