import React from 'react'

import './input-block.css'

interface InputBlockProps {
  label: string,
  id: string,
  value: string,
  setValue(value: string): void
}

export default function TextInputBlock({
  label,
  id,
  value,
  setValue,
}: InputBlockProps) {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}
