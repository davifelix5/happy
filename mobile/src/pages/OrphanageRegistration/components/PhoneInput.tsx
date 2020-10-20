import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'

import { getNumbers, formatPhoneNumber } from './utils'

import styles from '../RegistrationForm/styles/registration'

interface TelephoneInputProps {
  setValue: (value: string) => void,
  value: string,
}

export default function TelephoneInput({ setValue, value }: TelephoneInputProps) {
  const [inputValue, setInputValue] = useState('')

  function setDisplay(text: string) {
    let numbers = getNumbers(text)
    const userErasedNumber = text.length < inputValue.length

    if (userErasedNumber && (numbers.length === 7 || numbers.length === 2)) {
      numbers = numbers.slice(0, -1)
    }

    setValue(getNumbers(numbers))
  }

  useEffect(() => {
    setInputValue(formatPhoneNumber(value))
  }, [value])

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