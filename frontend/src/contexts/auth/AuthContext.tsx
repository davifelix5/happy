import React, { createContext, useState } from 'react';

import api from '../../services/api';

interface AuthContextData {
  name: string
  token: string
  login(email: string, password: string): Promise<string>
  logout(): void
  register(name: string, email: string, password: string): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContextProvider: React.FC = ({ children }) => {

  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  async function login(email: string, password: string) {
    const token = '982734812834'
    return token
  }

  async function register(name: string, email: string, password: string) {

  }

  async function logout() {

  }

  return (
    <AuthContext.Provider value={{
      name,
      token,
      login,
      register,
      logout,
    }}>

      {children}

    </AuthContext.Provider>
  )

}

export default AuthContextProvider;