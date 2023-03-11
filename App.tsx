import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import Routes from './src/routes'
import { NavigationContainer } from '@react-navigation/native'
import AuthProvider from './src/contexts/auth'

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />   
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;