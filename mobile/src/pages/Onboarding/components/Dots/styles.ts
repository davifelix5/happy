import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 30,
  },

  pagination: {
    backgroundColor: '#BECFD8',
    width: 8,
    height: 4,
    borderRadius: 4
  },

  paginationActive: {
    backgroundColor: '#FFD152',
    width: 16,
    height: 4,
    borderRadius: 4
  },
})

export default styles