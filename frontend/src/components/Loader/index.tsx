import React from 'react'

import './loader.css'

interface LoaderProps {
  size: number,
  color: string,
}

export default function Loader({ size, color }: LoaderProps) {

  const styles = {
    width: size,
    height: size,
    borderTopColor: color
  }

  return (
    <div className="loader" style={styles}></div>
  )
}
