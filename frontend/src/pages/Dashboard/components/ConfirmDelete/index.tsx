import React, { useState } from 'react'

import Loader from '../../../../components/Loader'

import api from '../../../../services/api'

import image from '../../../../images/warning.svg'

import '../../../../components/WarningPage/warning-page.css'

interface ConfirmDeleteProps {
  orphanageToDelete: {
    name: string,
    id: number
  }
  cleanOrphanageToDelete(): void
  setDeletingError(deletingError: boolean): void
  onDeleteSuccess(): void
}

export default function WarningPage({ orphanageToDelete, cleanOrphanageToDelete, setDeletingError, onDeleteSuccess }: ConfirmDeleteProps) {

  const [deleting, setDeleting] = useState(false)

  function handleDeleteOrphanage() {
    setDeleting(true)
    api.delete(`orphanages/delete/${orphanageToDelete.id}`)
      .then(() => {
        onDeleteSuccess()
      })
      .catch(() => {
        setDeletingError(true)
      })
      .finally(() => {
        cleanOrphanageToDelete()
      })
  }

  return (
    <div className="warning-container">
      <div className="text-content">
        <h1>
          Excluir
        </h1>
        <p>
          Tem certeza que deseja excluir o orfanato {orphanageToDelete.name}?
        </p>
        <div className="button-container">
          <button className="secondary-btn" onClick={() => cleanOrphanageToDelete()}>
            Não
          </button>
          <button className="primary-btn" disabled={deleting} onClick={handleDeleteOrphanage}>
            {deleting ? <Loader size={24} color="#fff" /> : 'Sim'}
          </button>
        </div>
      </div>
      <div className="image-container">
        <img src={image} alt="Deletar orfanato" />
      </div>
    </div>
  )
}
