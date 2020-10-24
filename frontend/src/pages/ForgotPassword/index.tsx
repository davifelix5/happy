import React, { FormEvent, useState } from 'react'

import TextInputBlock from '../../components/TextInputBlock'
import AuthSideBar from '../../components/AuthSideBar'
import BackButton from '../../components/BackButton'
import ConfirmButton from '../../components/ConfirmButton'

import './forgot-password.css'

export default function Login() {

  const [email, setEmail] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="container forgot-password-container">
      <AuthSideBar />
      <form className="content-container" onSubmit={handleSubmit}>
        <BackButton to="/auth/login" />
        <h1>Esqueci a senha</h1>
        <h2>Sua redefinição de senha será enviada para o e-mail cadastrado.</h2>
        <TextInputBlock
          id='email'
          label='E-mail'
          value={email}
          setValue={setEmail}
        />
        <ConfirmButton text="Enviar" />
      </form>
    </div>
  )
}
