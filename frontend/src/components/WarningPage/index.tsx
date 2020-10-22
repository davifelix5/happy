import React from 'react'
import { Link } from 'react-router-dom'

import image from '../../images/warning.svg'

import './warning-page.css'

interface WarningPageProps {
  title: string,
  text: string,
  backButtonMessage: string,
  onBackButtonClick(): void
}

export default function WarningPage({
  onBackButtonClick
}: WarningPageProps) {
  return (
    <div className="warning-container">
      <div className="text-content">
        <h1>
          Oops!
        </h1>
        <p>
          Houve um erro no cadastro do seu orfanato.
          Confira os dados que você informou!
        </p>
        <div className="button-container">
          <Link to="/app">
            Voltar para o mapa
          </Link>
          <button onClick={onBackButtonClick}>
            Tentar novamente
          </button>
        </div>
      </div>
      <div className="image-container">
        <img src={image} alt="Cadastro feito com sucesso" />
      </div>
    </div>
  )
}
