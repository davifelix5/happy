import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../../utils/mapIcon'

import Sidebar from '../../components/Sidebar'

import '../../styles/pages/orphanages-map.css'

import api from '../../services/api'

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/orphanages')
      .then(res => res.data)
      .then(result => result.data)
      .then(orphanages => setOrphanages(orphanages))
  }, [])

  return (
    <div id="page-map">
      <Sidebar />
      <Map
        center={[-23.5668582, -46.660879]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {orphanages && orphanages.map(orph => {
          return (
            <Marker
              icon={mapIcon}
              position={[orph.latitude, orph.longitude]}
              key={orph.id}
            >
              <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                <span>{orph.name}</span>
                <Link to={`/orphanage/${orph.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="/" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>

    </div>
  );
}

export default OrphanagesMap;