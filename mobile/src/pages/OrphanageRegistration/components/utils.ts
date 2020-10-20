export function getNumbers(string: string) {
  const numbers = Array.from(string).filter(value => !isNaN(+value) && value !== ' ')
  return numbers.join('')
}

export function formatPhoneNumber(numbers: string) {
  if (numbers.length < 2) return numbers

  let formatedNumber = '(' + numbers.slice(0, 2) + ') ' + numbers.slice(2, 7)

  if (numbers.length > 6) {
    formatedNumber += ' - ' + numbers.slice(7)
  }

  return formatedNumber
}