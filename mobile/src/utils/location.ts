import * as Location from 'expo-location'

export default async function getUserLocation() {
  const { status } = await Location.requestPermissionsAsync()

  if (status !== 'granted') {
    alert('Precisamos da sua permissão')
    throw new Error('Permition not granted!')
  }

  const { coords } = await Location.getCurrentPositionAsync({})
  const { latitude, longitude } = coords
  return { latitude, longitude }

}