import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import TextInputBlock from '../../components/TextInputBlock'
import PasswordInputBlock from '../../components/PasswordInputBlock'
import AuthSideBar from '../../components/AuthSideBar'
import BackButton from '../../components/BackButton'
import ConfirmButton from '../../components/ConfirmButton'

import './login.css'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="container">
      <AuthSideBar />
      <form className="content-container" onSubmit={handleSubmit}>
        <BackButton to="/" />
        <h1>Fazer login</h1>
        <TextInputBlock
          id='email'
          label='E-mail'
          value={email}
          setValue={setEmail}
        />
        <PasswordInputBlock
          id='passoword'
          label='Senha'
          value={password}
          setValue={setPassword}
        />
        <div className="actions">
          <div className="remember-me">
            <label className="checkbox" htmlFor="remember">
              <input type="checkbox" id="remember" />
              <span></span>
            </label>
            <label htmlFor="remember">Lembrar-me</label>
          </div>
          <Link to="/auth/forgot-password">Esqueci minha senha</Link>
        </div>
        <ConfirmButton text="Entrar" />
      </form>
    </div>
  )
}
