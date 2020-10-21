import { StyleSheet, Dimensions } from 'react-native'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cedee5',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    width: Dimensions.get('window').width
  },

  image: {
    maxHeight: '55%',
  },

  title: {
    fontSize: 30,
    color: '#0089A5',
    lineHeight: 36,
    fontFamily: 'Nunito_800ExtraBold',
    maxWidth: 300,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginVertical: 20,
  },

  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default styles