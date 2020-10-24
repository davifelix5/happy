import React, { useState } from 'react'

import '../TextInputBlock/input-block.css'

import './password-block.css'

import { FiEye, FiEyeOff } from 'react-icons/fi'

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

  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  const type = showPassword ? 'text' : 'password'

  return (
    <div className="input-block input-password">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={e => setValue(e.target.value)} type={type} />
      <div className="show-password-block">
        <button onClick={toggleShowPassword}>
          {showPassword ? (
            <FiEyeOff size={25} color="#15C3D6" />
          ) : (
              <FiEye size={25} color="#8FA7B2" />
            )}
        </button>
      </div>
    </div>
  )
}
