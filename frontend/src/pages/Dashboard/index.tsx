import React, { useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import OrphanageCard from './components/OrphanageCard'
import Loader from '../../components/Loader'
import WarningPage from '../../components/WarningPage'
import ConfirmDelete from './components/ConfirmDelete'

import api from '../../services/api'

import './dashboard.css'

interface OrphanageData {
  id: number
  name: string
  latitude: number
  longitude: number
  pending: boolean
}

export default function Dashboard() {

  const [activeButtonIndex, setActiveButtonIndex] = useState(0)
  const [orphanages, setOrphanages] = useState<OrphanageData[]>([])
  const [orphanageToDelete, setOrphanageToDelete] = useState<OrphanageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [deletingError, setDeletingError] = useState(false)

  useEffect(() => {
    setLoading(true)
    const url = activeButtonIndex === 0 ? 'orphanages' : 'pending-orphanages'
    api.get(url)
      .then(res => {
        setOrphanages(res.data.data)
      })
      .catch(err => {
        setOrphanages([])
        alert('Erro ao encontrar os orfanatos!')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [activeButtonIndex])

  return (
    <div className="dashboard-container">
      {deletingError && (
        <WarningPage
          title="Erro ao excluir"
          subtitle={`Houv um erro ao excluir o orfanato ${orphanageToDelete?.name}. Tente novamente`}
          secondButtonText="Ok"
          onSecondButtonClick={() => {
            setOrphanageToDelete(null)
            setDeletingError(false)
          }}
        />
      )}
      {orphanageToDelete && (
        <ConfirmDelete
          orphanageToDelete={orphanageToDelete}
          cleanOrphanageToDelete={() => setOrphanageToDelete(null)}
          setDeletingError={setDeletingError}
          onDeleteSuccess={() => setOrphanages(orphanages.filter(orph => orph.id !== orphanageToDelete.id))}
        />
      )}
      <Sidebar
        activeButtonIndex={activeButtonIndex}
        setActiveButtonIndex={setActiveButtonIndex}
      />
      {loading ? (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
          <Loader size={40} color="#15C3D6" />
        </div>
      ) : (
          <div className="cards">
            {orphanages.map(orphanage => (
              <OrphanageCard setOrphanageToDelete={setOrphanageToDelete} orphanage={orphanage} />
            ))}
          </div>
        )}
    </div>
  )
}
