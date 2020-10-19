import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#39CC83'
  },

  title: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 40,
  },

  infoText: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    maxWidth: 309,
  },

  button: {
    backgroundColor: '#19C06D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 56,
    width: 120,

  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Nunito_800ExtraBold',
  }
})

export default styles