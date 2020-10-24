import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './back-button.css'

interface BackButtonProps {
  to: string
}

export default function BackButton({ to }: BackButtonProps) {
  return (
    <Link className="back-button" to={to}>
      <FiArrowLeft size={24} color="#15C3D6" />
    </Link>
  )
}
