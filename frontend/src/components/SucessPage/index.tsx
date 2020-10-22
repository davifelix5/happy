import React from 'react'
import { Link } from 'react-router-dom'

import image from '../../images/success.svg'

import './success-page.css'

export default function SuccessPage() {
  return (
    <div className="success-container">
      <div className="text-content">
        <h1>
          Ebaaa!
        </h1>
        <p>
          O cadastro deu certo e foi enviado
          ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <Link to="/app">
          Voltar para o mapa
        </Link>
      </div>
      <div className="image-container">
        <img src={image} alt="Cadastro feito com sucesso" />
      </div>
    </div>
  )
}
