import React, { useState } from 'react'
import { TextInput } from 'react-native'

import styles from '../styles'

interface TelephoneInputProps {
  setValue: (value: string) => void,
}

export default function TelephoneInput({ setValue }: TelephoneInputProps) {
  const [inputValue, setInputValue] = useState('')

  function getNumbers(string: string) {
    const numbers = Array.from(string).filter(value => !isNaN(+value) && value !== ' ')
    return numbers.join('')
  }

  function setDisplay(text: string) {
    let numbers = getNumbers(text)
    const userErasedNumber = text.length < inputValue.length

    if (userErasedNumber && (numbers.length === 7 || numbers.length === 2)) {
      numbers = numbers.slice(0, -1)
    }

    if (numbers.length < 2) return setInputValue(numbers)

    let newText = '(' + numbers.slice(0, 2) + ') ' + numbers.slice(2, 7)

    if (numbers.length > 6) {
      newText += ' - ' + numbers.slice(7)
    }

    setInputValue(newText)
    setValue(getNumbers(newText))
  }

  return (
    <TextInput
      style={styles.input}
      value={inputValue}
      onChangeText={setDisplay}
      maxLength={17}
      keyboardType="phone-pad"
    />
  )
}