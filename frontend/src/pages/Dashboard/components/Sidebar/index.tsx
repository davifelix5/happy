import React from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi'

import logo from '../../../../images/map-marker.svg'

import './sidebar.css'

interface SidebarProps {
  activeButtonIndex: number
  setActiveButtonIndex(index: number): void
}

export default function Sidebar({ activeButtonIndex, setActiveButtonIndex }: SidebarProps) {
  return (
    <div className="dashboard-sidebar">
      <Link to="/">
        <img src={logo} alt="Happy" />
      </Link>
      <div className="body">
        <button
          className={activeButtonIndex === 0 ? 'active' : ''}
          onClick={() => setActiveButtonIndex(0)}
        >
          <FiMapPin size={24} />
        </button>
        <button
          className={activeButtonIndex === 1 ? 'active' : ''}
          onClick={() => setActiveButtonIndex(1)}
        >
          <FiAlertCircle size={24} />
        </button>
      </div>
      <button className="logout-button">
        <FiPower size={24} color="#fff" />
      </button>
    </div>
  )
}

