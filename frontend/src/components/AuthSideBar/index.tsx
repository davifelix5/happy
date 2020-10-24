import React from 'react'

import image from '../../images/logo-lg.svg'

import './auth-side-bar.css'

export default function AuthSideBar() {
  return (
    <div className="sidebar-lg">
      <img src={image} alt="Logo da Happy" />
      <div className="location-info">
        <strong>São paulo</strong>
        <p>São Paulo</p>
      </div>
    </div>
  )
}