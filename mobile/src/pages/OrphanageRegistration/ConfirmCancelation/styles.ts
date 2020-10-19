import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FF669D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
  },

  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 32,
    color: '#fff',
    marginVertical: 20,
  },

  infoText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    color: '#fff',
    maxWidth: 213,
    marginBottom: 40,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 56,
    borderRadius: 20,
  },

  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#fff',
  },

  noButton: {
    borderColor: '#D6487B',
    borderWidth: 2,
    marginRight: 10,
  },

  yesButton: {
    backgroundColor: '#D6487B',
  },

})

export default styles
