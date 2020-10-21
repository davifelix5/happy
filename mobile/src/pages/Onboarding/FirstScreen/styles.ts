import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cedee5',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    width: Dimensions.get('window').width
  },

  image: {
    alignSelf: 'center',
    maxHeight: '35%',
  },

  title: {
    fontSize: 48,
    color: '#0089A5',
    lineHeight: 48,
    fontFamily: 'Nunito_800ExtraBold',
    maxWidth: 220,
    marginVertical: 10,
  },

  text: {
    color: '#5C8599',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 240,
    marginBottom: 15,
  },

  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

})

export default styles