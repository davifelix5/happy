import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import Header from '../../components/Header'

import SelectMapPosition from './RegistrationForm/SelectMapPosition'
import OrphanageData from './RegistrationForm/OrphanageData'
import OrphanageVisitation from './RegistrationForm/OrphanageVisitation'
import ConfirmCancelation from './ConfirmCancelation'
import SuccessScreen from './SuccessScreen'
import { RegistrationContextProvider } from './registrationContext'

export default function RegistrationRoutes() {
  return (
    <RegistrationContextProvider>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f3f4f5' } }}>
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione um local no mapa" />
          }}
        />
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Dados do orfanato" showCloseBtn />
          }}
        />
        <Screen
          name="OrphanageVisitation"
          component={OrphanageVisitation}
          options={{
            headerShown: true,
            header: () => <Header title="Dados para visitação do orfanato" showCloseBtn />
          }}
        />
        <Screen
          name="ConfirmCancelation"
          component={ConfirmCancelation}
        />
        <Screen
          name="SucessScreen"
          component={SuccessScreen}
        />
      </Navigator>
    </RegistrationContextProvider>
  )
}
