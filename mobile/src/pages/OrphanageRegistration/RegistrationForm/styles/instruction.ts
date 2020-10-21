import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 100,
    position: 'absolute',
    backgroundColor: '#15C3D6aa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 24,
    textAlign: 'center',
    opacity: 1,
    marginVertical: 25,
    maxWidth: 200,
  },
})

export default styles
