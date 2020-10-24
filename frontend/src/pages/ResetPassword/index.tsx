import React, { FormEvent, useState } from 'react'

import PasswordInputBlock from '../../components/PasswordInputBlock'
import AuthSideBar from '../../components/AuthSideBar'
import BackButton from '../../components/BackButton'
import ConfirmButton from '../../components/ConfirmButton'

import './reset-password.css'

export default function Login() {

  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="container reset-password-container">
      <AuthSideBar />
      <form className="content-container" onSubmit={handleSubmit}>
        <BackButton to="/auth/forgot-password" />
        <h1>Redefinição de senha</h1>
        <h2>Escolha uma nova senha para você acessar o dashboard do Happy</h2>
        <PasswordInputBlock
          id='passoword'
          label='Senha'
          value={password}
          setValue={setPassword}
        />
        <PasswordInputBlock
          id='passoword2'
          label='Confimarção da senha'
          value={password2}
          setValue={setPassword2}
        />
        <ConfirmButton text="Redefinir" />
      </form>
    </div>
  )
}
