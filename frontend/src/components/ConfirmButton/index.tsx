import React from 'react'

import './confirm-button.css'

interface ConfirmButtonProps {
  text: string
}

export default function ConfirmButton({ text, ...props }: ConfirmButtonProps) {
  return (
    <button className="confirm-button" {...props}>
      {text}
    </button>
  )
}
