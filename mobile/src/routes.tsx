import React, { useEffect, useState } from 'react'
import { AppLoading } from 'expo'
import { createStackNavigator } from '@react-navigation/stack'

import { isUserFirstAccess } from './utils/onboarding'

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import RegistrationRoutes from './pages/OrphanageRegistration/registration.routes'
import Onboarding from './pages/Onboarding/'

import Header from './components/Header'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {

  const [firstAccess, setFirstAccess] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    isUserFirstAccess()
      .then(res => {
        setFirstAccess(res)
        setChecked(true)
      })
  }, [])

  if (!checked) {
    return <AppLoading />
  }

  return (
    <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f3f4f5' } }}>
      {firstAccess && <Screen
        name="Onboarding"
        component={Onboarding}
      />}
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