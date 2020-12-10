import React from 'react'
import { FiArrowRight, FiEdit3, FiTrash } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'

import mapIcon from '../../../../utils/mapIcon'

import './card.css'

interface OrphanageData {
  name: string
  latitude: number
  longitude: number
  id: number,
  pending: boolean,
}

interface OrphanageCardProps {
  orphanage: OrphanageData
  setOrphanageToDelete(orphanage: OrphanageData): void
}

export default function OrphanageCard({ orphanage, setOrphanageToDelete }: OrphanageCardProps) {
  return (
    <div className="card-container">
      <Map
        className="map"
        center={[orphanage.latitude, orphanage.longitude]}
        zoom={25}
        dragging={false}
        scrollWheelZoom={false}
        touchZoom={false}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          icon={mapIcon}
          position={[orphanage.latitude, orphanage.longitude]}
        />
      </Map>
      <div className="info">
        <strong>
          {orphanage.name}
        </strong>
        <div className="action-buttons">
          {orphanage.pending ? (
            <button>
              <FiArrowRight size={24} />
            </button>
          ) : (
              <>
                <button>
                  <FiEdit3 size={24} />
                </button>
                <button onClick={() => setOrphanageToDelete(orphanage)}>
                  <FiTrash size={24} />
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  )
}

