import React from 'react'

import image from '../../images/warning.svg'

import './warning-page.css'

interface WarningPageProps {
  title: string
  subtitle: string
  firstButtonText?: string,
  secondButtonText?: string,
  onFirstButtonClicked?(): void
  onSecondButtonClick?(): void
}

export default function WarningPage({
  title,
  subtitle,
  firstButtonText,
  secondButtonText,
  onFirstButtonClicked,
  onSecondButtonClick
}: WarningPageProps) {
  return (
    <div className="warning-container">
      <div className="text-content">
        <h1>
          {title}
        </h1>
        <p>
          {subtitle}
        </p>
        <div className="button-container">
          {firstButtonText && (
            <button className="secondary-btn" onClick={onFirstButtonClicked}>
              {firstButtonText}
            </button>
          )}
          {secondButtonText && (
            <button className="primary-btn" onClick={onSecondButtonClick}>
              {secondButtonText}
            </button>
          )}
        </div>
      </div>
      <div className="image-container">
        <img src={image} alt="Cadastro feito com sucesso" />
      </div>
    </div>
  )
}
