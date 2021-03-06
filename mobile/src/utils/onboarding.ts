import AsyncStorage from '@react-native-community/async-storage'

export async function isUserFirstAccess() {
  try {
    const result = await AsyncStorage.getItem('@happy/userHasAccessdedApp')
    if (!result) {
      await AsyncStorage.setItem('@happy/userHasAccessdedApp', String(true))
      return true
    }
    return false
  } catch (err) {
    return true
  }
}